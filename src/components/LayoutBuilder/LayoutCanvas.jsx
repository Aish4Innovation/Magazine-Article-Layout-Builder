

import React, { useRef, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useLayout } from '../../contexts/LayoutContext';
import { DND_ITEM_TYPES, BLOCK_TYPES } from '../../utils/constants';
import GridBlock from './GridBlock';
import TextBlock from '../ContentBlocks/TextBlock';
import ImageBlock from '../ContentBlocks/ImageBlock';
import VideoBlock from '../ContentBlocks/VideoBlock';
import QuoteBlock from '../ContentBlocks/QuoteBlock';
import styles from '../../styles/layout.module.css';

const LayoutCanvas = ({ gridWidth, gridHeight }) => {
  const { layout, addBlock, updateBlock, gridSettings, deviceMode } = useLayout();
  const canvasRef = useRef(null);

  const calculatedColumnWidthPx = gridSettings.columns > 0
    ? (deviceMode.width === '100%'
        ? (canvasRef.current ? (canvasRef.current.clientWidth - (gridSettings.columns - 1) * gridSettings.columnGap) / gridSettings.columns : 0)
        : (parseFloat(deviceMode.width) - (gridSettings.columns - 1) * gridSettings.columnGap) / gridSettings.columns)
    : 0;

  const calculatedRowHeightPx = parseFloat(gridSettings.rowHeight);

  const [, drop] = useDrop(() => ({
    accept: [DND_ITEM_TYPES.BLOCK_TYPE, DND_ITEM_TYPES.GRID_BLOCK],
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset(); // Use getClientOffset for the exact mouse position
      if (!canvasRef.current || !clientOffset) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const relativeX = clientOffset.x - canvasRect.left;
      const relativeY = clientOffset.y - canvasRect.top;

      // --- CRITICAL CHECK 1: Coordinate Calculation ---
      // Ensure these calculations are robust and don't produce 0 or negative values unexpectedly
      // Math.floor is generally better for calculating grid indices from pixel coordinates
      const gridColumnStart = Math.max(1, Math.floor(relativeX / (calculatedColumnWidthPx + gridSettings.columnGap)) + 1);
      const gridRowStart = Math.max(1, Math.floor(relativeY / (calculatedRowHeightPx + gridSettings.rowGap)) + 1);

      // Ensure block doesn't start outside the defined grid columns (max grid column)
      // No need for rows, as CSS grid will create new rows if needed, but columns are fixed.
      const finalGridColumnStart = Math.min(gridColumnStart, gridSettings.columns);


      if (item.type === DND_ITEM_TYPES.BLOCK_TYPE) {
        // This is a new block being added from the sidebar
        addBlock(item.blockType, finalGridColumnStart, gridRowStart); // Use finalGridColumnStart
        return { dropped: true }; // Indicate a successful drop to the drag source
      } else if (item.type === DND_ITEM_TYPES.GRID_BLOCK) {
        // This is an existing block being repositioned
        if (item.originalColumnStart === finalGridColumnStart && item.originalRowStart === gridRowStart) {
          return { dropped: true }; // Still indicate a drop, even if position didn't change
        }

        updateBlock(item.id, {
          gridColumnStart: finalGridColumnStart, // Use finalGridColumnStart
          gridRowStart: gridRowStart,
        });
        return { moved: true }; // Indicate a successful move
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [addBlock, updateBlock, calculatedColumnWidthPx, calculatedRowHeightPx, gridSettings.columnGap, gridSettings.rowGap, gridSettings.columns, deviceMode.width]);


  // --- CRITICAL CHECK 2: ref assignment ---
  // Ensure that drop(node) is always called with the actual DOM node.
  // The useEffect with [drop] dependency is the correct pattern.
  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current);
    }
  }, [drop]);

  const renderContentBlock = useCallback((block) => {
    if (!block || !block.type) {
      console.error("renderContentBlock received an invalid block:", block);
      return <div className={styles.errorBlockPlaceholder}>Invalid Block Data</div>;
    }

    switch (block.type) {
      case BLOCK_TYPES.TEXT:
        return TextBlock ? <TextBlock block={block} /> : <div className={styles.errorBlockPlaceholder}>Text Block Component Missing</div>;
      case BLOCK_TYPES.IMAGE:
        return ImageBlock ? <ImageBlock block={block} /> : <div className={styles.errorBlockPlaceholder}>Image Block Component Missing</div>;
      case BLOCK_TYPES.VIDEO:
        return VideoBlock ? <VideoBlock block={block} /> : <div className={styles.errorBlockPlaceholder}>Video Block Component Missing</div>;
      case BLOCK_TYPES.QUOTE:
        return QuoteBlock ? <QuoteBlock block={block} /> : <div className={styles.errorBlockPlaceholder}>Quote Block Component Missing</div>;
      default:
        console.warn(`Unknown block type "${block.type}". Rendering placeholder.`);
        return <div className={styles.unknownBlockPlaceholder}>Unknown Block Type: {block.type}</div>;
    }
  }, []);

  return (
    <div
      ref={canvasRef} // The canvasRef is correctly assigned
      className={`${styles.layoutCanvas} ${drop.isOver ? styles.layoutGridHighlight : ''}`} // Assuming layoutGridHighlight is for drop feedback
      style={{
          width: deviceMode.width,
          gridTemplateColumns: `repeat(${gridSettings.columns}, 1fr)`,
          gridAutoRows: gridSettings.rows === 0 ? `minmax(${gridSettings.rowHeight}, auto)` : `repeat(${gridSettings.rows}, ${gridSettings.rowHeight})`,
          gap: `${gridSettings.rowGap}px ${gridSettings.columnGap}px`,
          minHeight: gridHeight || 'auto',
          height: gridHeight,
      }}
    >
      {layout.map((block) => (
        block ? (
            <GridBlock
              key={block.id}
              block={block}
              columnWidthPx={calculatedColumnWidthPx}
              rowHeightPx={calculatedRowHeightPx}
              columnGap={gridSettings.columnGap}
              rowGap={gridSettings.rowGap}
              gridColumns={gridSettings.columns}
            >
              {renderContentBlock(block)}
            </GridBlock>
        ) : (
            <div key={`corrupted-${Math.random()}`} className={styles.errorBlockPlaceholder} style={{ gridColumn: 'span 12' }}>
                Corrupted Block Data Found
            </div>
        )
      ))}
    </div>
  );
};

export default LayoutCanvas;
