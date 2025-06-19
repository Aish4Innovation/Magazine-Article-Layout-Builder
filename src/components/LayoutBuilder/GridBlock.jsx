// import React from 'react';
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import { useLayout } from '../../contexts/LayoutContext';
// import styles from '../../styles/layout.module.css';
// import { useDrag } from 'react-dnd';
// import TextBlock from '../ContentBlocks/TextBlock'; // NEW IMPORTS
// import ImageBlock from '../ContentBlocks/ImageBlock';
// import VideoBlock from '../ContentBlocks/VideoBlock';
// import QuoteBlock from '../ContentBlocks/QuoteBlock';
// import { BLOCK_TYPES } from '../../utils/constants'; // Import BLOCK_TYPES

// const ItemTypes = {
//   GRID_BLOCK: 'gridBlock',
// };

// const pxToGridSpan = (px, unitPx, gapPx) => {
//   if (unitPx <= 0) return 1;
//   const span = (px + gapPx) / (unitPx + gapPx);
//   return Math.max(1, Math.round(span));
// };

// function GridBlock({ block, columnWidthPx, rowHeightPx, columnGap, rowGap, gridColumns }) {
//   const { updateBlock } = useLayout();

//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemTypes.GRID_BLOCK,
//     item: { id: block.id, type: block.type, gridColumnSpan: block.gridColumnSpan, gridRowSpan: block.gridRowSpan },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   const blockStyle = {
//     gridColumn: `${block.gridColumnStart} / span ${block.gridColumnSpan}`,
//     gridRow: `${block.gridRowStart} / span ${block.gridRowSpan}`,
//     opacity: isDragging ? 0.5 : 1,
//     cursor: 'grab',
//   };

//   const initialWidth = (block.gridColumnSpan * columnWidthPx) + ((block.gridColumnSpan - 1) * columnGap);
//   const initialHeight = (block.gridRowSpan * rowHeightPx) + ((block.gridRowSpan - 1) * rowGap);

//   const minBlockWidth = (1 * columnWidthPx);
//   const minBlockHeight = (1 * rowHeightPx);

//   const maxBlockWidth = ((gridColumns - block.gridColumnStart + 1) * columnWidthPx) + ((gridColumns - block.gridColumnStart) * columnGap);
//   const maxBlockHeight = 99999;

//   const onResizeStop = (e, data) => {
//     const { size } = data;

//     let newColumnSpan = pxToGridSpan(size.width, columnWidthPx, columnGap);
//     newColumnSpan = Math.min(newColumnSpan, gridColumns - block.gridColumnStart + 1);
//     newColumnSpan = Math.max(1, newColumnSpan);

//     let newRowSpan = pxToGridSpan(size.height, rowHeightPx, rowGap);
//     newRowSpan = Math.max(1, newRowSpan);

//     if (newColumnSpan !== block.gridColumnSpan || newRowSpan !== block.gridRowSpan) {
//       updateBlock(block.id, {
//         gridColumnSpan: newColumnSpan,
//         gridRowSpan: newRowSpan,
//       });
//     }
//   };

//   if (columnWidthPx === 0 || rowHeightPx === 0) {
//     return (
//       <div className={`${styles.gridBlock} ${styles[`blockType-${block.type}`]}`} style={blockStyle}>
//         <p>Loading Block...</p>
//       </div>
//     );
//   }

//   // Dynamically render the appropriate content block component
//   let contentComponent;
//   switch (block.type) {
//     case BLOCK_TYPES.TEXT:
//       contentComponent = <TextBlock content={block.content || 'Default Text'} />;
//       break;
//     case BLOCK_TYPES.IMAGE:
//       contentComponent = <ImageBlock imageUrl={block.imageUrl || 'https://via.placeholder.com/300'} altText={block.altText || 'Default Alt Text'} />;
//       break;
//     case BLOCK_TYPES.VIDEO:
//       contentComponent = <VideoBlock videoUrl={block.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'} />; // Rickroll as default
//       break;
//     case BLOCK_TYPES.QUOTE:
//       contentComponent = <QuoteBlock quoteText={block.quoteText || 'Default Quote'} author={block.author || 'Unknown'} />;
//       break;
//     default:
//       contentComponent = <p>Unknown Block Type: {block.type}</p>;
//   }

//   return (
//     <ResizableBox
//       width={initialWidth}
//       height={initialHeight}
//       minConstraints={[minBlockWidth, minBlockHeight]}
//       maxConstraints={[maxBlockWidth, maxBlockHeight]}
//       resizeHandles={['se', 's', 'e']}
//       onResizeStop={onResizeStop}
//       axis="both"
//       className={styles.resizableGridBlock}
//       style={blockStyle}
//     >
//       <div
//         ref={drag}
//         className={`${styles.gridBlockInner} ${styles[`blockType-${block.type}`]}`}
//         style={{
//           width: '100%',
//           height: '100%',
//           border: '1px solid #ced4da',
//           borderRadius: '4px',
//           padding: '10px',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: '#333',
//           fontSize: '14px',
//           textAlign: 'center',
//           minHeight: '80px',
//           boxSizing: 'border-box',
//         }}
//         data-block-id={block.id}
//       >
//         {/* Render the appropriate content component */}
//         {contentComponent}
//       </div>
//     </ResizableBox>
//   );
// }

// export default GridBlock;


// src/components/LayoutBuilder/GridBlock.jsx

// src/components/LayoutBuilder/GridBlock.jsx

import React from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Make sure react-resizable CSS is imported
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/layout.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../utils/constants'; // Crucial: Import DND_ITEM_TYPES

// Helper function to convert pixel dimensions to grid spans
const pxToGridSpan = (px, unitPx, gapPx) => {
  if (unitPx <= 0) return 1; // Avoid division by zero
  // Calculate span based on total pixel size including gaps
  const span = (px + gapPx) / (unitPx + gapPx);
  // Ensure minimum span of 1 and round to nearest whole number
  return Math.max(1, Math.round(span));
};

function GridBlock({ block, children, columnWidthPx, rowHeightPx, columnGap, rowGap, gridColumns }) {
  const { updateBlock, viewMode } = useLayout();

  // useDrag hook to make the GridBlock draggable (for moving and deleting)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.GRID_BLOCK, // This type identifies an *existing* grid block
    item: {
      id: block.id,
      originalColumnStart: block.gridColumnStart, // Store original position for potential revert
      originalRowStart: block.gridRowStart,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Check if this specific item is being dragged
    }),
    // The 'end' function fires when the drag operation finishes (mouse released)
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult(); // Get the result returned by the drop target (e.g., LayoutCanvas or ArticleSettingsPanel)

      // If dropResult is null, it means the item was dropped outside any valid drop target.
      // If monitor.didDrop() is false, it confirms no compatible drop target handled it.
      if (!dropResult && !monitor.didDrop()) {
        // Revert the block to its original position if it wasn't dropped on a valid target
        updateBlock(item.id, {
          gridColumnStart: item.originalColumnStart,
          gridRowStart: item.originalRowStart,
        });
      }
    },
    canDrag: !!block // Only allow dragging if the block object exists
  }), [block, updateBlock]); // Dependencies: Re-run hook if block data or updateBlock changes

  // useDrop hook for the GridBlock itself (useful if you want to implement reordering by dragging
  // one block over another, or visual hover effects). For deletion to sidebar, the sidebar handles the drop.
  const [, drop] = useDrop(() => ({
    accept: DND_ITEM_TYPES.GRID_BLOCK, // Accepts other existing grid blocks (for reordering within the grid)
    // You could add hover logic here to change style when another block is dragged over this one.
  }), [block]); // Dependency on block for context

  // Basic check for valid block data before rendering
  if (!block) {
    console.error("GridBlock received an undefined or null 'block' prop. This block cannot be rendered.");
    return (
      <div className={`${styles.gridBlock} ${styles.gridBlockError}`}
           style={{ border: '1px dashed orange', padding: '10px', color: 'orange', textAlign: 'center' }}>
        Error: Block container data missing.
      </div>
    );
  }

  // Define the CSS grid styles for the block's position and span
  const blockStyle = {
    gridColumn: `${block.gridColumnStart} / span ${block.gridColumnSpan}`,
    gridRow: `${block.gridRowStart} / span ${block.gridRowSpan}`,
    opacity: isDragging ? 0.5 : 1, // Visual feedback during drag
    cursor: isDragging ? 'grabbing' : 'grab', // Cursor change
  };

  // Calculate initial dimensions for ResizableBox
  const initialWidth = (block.gridColumnSpan * columnWidthPx) + ((block.gridColumnSpan - 1) * columnGap);
  const initialHeight = (block.gridRowSpan * rowHeightPx) + ((block.gridRowSpan - 1) * rowGap);

  // Define min/max constraints for resizing
  const minBlockWidth = (1 * columnWidthPx); // Minimum 1 column span
  const minBlockHeight = (1 * rowHeightPx); // Minimum 1 row span

  // Max width: block cannot span beyond the total grid columns from its start position
  const maxBlockWidth = ((gridColumns - block.gridColumnStart + 1) * columnWidthPx) + ((gridColumns - block.gridColumnStart) * columnGap);
  const maxBlockHeight = 99999; // Effectively no max height, allows growing downwards

  // Callback for when resizing stops
  const onResizeStop = (e, data) => {
    const { size } = data; // Get the new size in pixels

    // Convert new pixel width/height back to grid spans
    let newColumnSpan = pxToGridSpan(size.width, columnWidthPx, columnGap);
    // Ensure new column span doesn't exceed grid boundaries
    newColumnSpan = Math.min(newColumnSpan, gridColumns - block.gridColumnStart + 1);
    // Ensure minimum span of 1
    newColumnSpan = Math.max(1, newColumnSpan);

    let newRowSpan = pxToGridSpan(size.height, rowHeightPx, rowGap);
    newRowSpan = Math.max(1, newRowSpan);

    // Update block state only if dimensions have actually changed
    if (newColumnSpan !== block.gridColumnSpan || newRowSpan !== block.gridRowSpan) {
      updateBlock(block.id, {
        gridColumnSpan: newColumnSpan,
        gridRowSpan: newRowSpan,
      });
    }
  };

  return (
    <ResizableBox
      width={initialWidth}
      height={initialHeight}
      minConstraints={[minBlockWidth, minBlockHeight]}
      maxConstraints={[maxBlockWidth, maxBlockHeight]}
      resizeHandles={['se', 's', 'e']} // South-East, South, East handles for resizing
      onResizeStop={onResizeStop}
      axis="both" // Allow resizing in both X and Y directions
      // Apply general block styles and structure mode highlight
      className={`${styles.resizableGridBlock} ${viewMode === 'structure' ? styles.structureModeActive : ''}`}
      style={blockStyle} // Apply grid position/span styles
    >
      <div
        // Attach both drag and drop refs to the inner content div
        ref={(node) => {
          if (node) {
            drag(node); // Makes the element draggable
            drop(node); // Makes the element a drop target (for internal reordering or future features)
          }
        }}
        // Apply block type specific styles and inner container styles
        className={`${styles.gridBlockInner} ${styles[`blockType-${block.type}`]}`}
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ced4da', // Default border for blocks
          borderRadius: '4px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          color: '#333',
          fontSize: '14px',
          textAlign: 'left',
          minHeight: '80px',
          boxSizing: 'border-box',
          overflow: 'hidden', // Hide overflow content within the block
          backgroundColor: block.backgroundColor, // Use block's custom background color
        }}
        data-block-id={block.id} // Custom data attribute for identifying block by ID
      >
        {/* Render the actual content block (e.g., TextBlock, ImageBlock) inside */}
        {React.cloneElement(children, { viewMode, block: block })}
      </div>
    </ResizableBox>
  );
}

export default GridBlock;