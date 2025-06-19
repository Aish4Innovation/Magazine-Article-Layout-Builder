// src/utils/layoutHelpers.js

// Converts pixel coordinates to grid column and row start positions
export const pixelToGridCoordinates = (
    pixelX,
    pixelY,
    gridRect,           // Bounding client rect of the grid container {left, top, width, height}
    gridSettings,       // {columns, rowHeight, columnGap, rowGap}
    canvasScale = 1     // Scale factor of the canvas (if zoomed)
  ) => {
    // Adjust pixel coordinates by canvas scale
    const adjustedPixelX = pixelX / canvasScale;
    const adjustedPixelY = pixelY / canvasScale;
  
    // Calculate coordinates relative to the grid container
    const relativeX = adjustedPixelX - gridRect.left;
    const relativeY = adjustedPixelY - gridRect.top;
  
    // Calculate actual pixel dimensions of a grid cell
    // Total width of columns and gaps
    const totalColumnGapWidth = gridSettings.columnGap * (gridSettings.columns - 1);
    const effectiveColumnWidth = (gridRect.width - totalColumnGapWidth) / gridSettings.columns;
  
    // Row height is already in pixels from gridSettings.rowHeight (e.g., '100px')
    const effectiveRowHeight = parseFloat(gridSettings.rowHeight);
  
  
    // Calculate gridColumnStart
    let gridColumnStart = 1;
    let currentX = 0;
    for (let i = 1; i <= gridSettings.columns; i++) {
      const colEnd = currentX + effectiveColumnWidth;
      if (relativeX < colEnd) {
        gridColumnStart = i;
        break;
      }
      currentX = colEnd + gridSettings.columnGap;
      if (i === gridSettings.columns) { // If it's past the last column, place in last column
          gridColumnStart = gridSettings.columns;
      }
    }
  
    // Calculate gridRowStart
    // This is simpler as rows are uniform height
    let gridRowStart = Math.floor(relativeY / (effectiveRowHeight + gridSettings.rowGap)) + 1;
    if (gridRowStart < 1) gridRowStart = 1;
  
    return { gridColumnStart, gridRowStart };
  };
  
  // ... (You can add other layout helper functions here later, like for resizing/dragging)