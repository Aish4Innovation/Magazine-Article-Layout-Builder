
// export const DND_ITEM_TYPES = {
//   BLOCK_TYPE: 'block_type', // Used when dragging a block type from the selector
//   GRID_BLOCK: 'grid_block', // Used when dragging an existing block on the grid
// };

// // Default Grid Settings
// export const DEFAULT_GRID_SETTINGS = {
//   columns: 12, // Default to a 12-column grid
//   columnGap: 20, // Default column gap in pixels
//   rowGap: 10,    // Default row gap in pixels
//   rowHeight: '100px', // Default row height in pixels (as a CSS string)
//   rows: 0, // NEW: Default to 0, meaning 'auto' or 'unspecified fixed height'
// };

// // Pre-defined grid presets
// export const GRID_PRESETS = {
//   FULL_WIDTH: {
//       columns: 1,
//       columnGap: 0,
//       rowGap: 10,
//       rowHeight: '100px',
//       rows: 0, // NEW: Default to 0 rows (auto)
//   },
//   TWO_COLUMNS: {
//       columns: 2,
//       columnGap: 20,
//       rowGap: 10,
//       rowHeight: '100px',
//       rows: 0, // NEW: Default to 0 rows (auto)
//   },
//   THREE_COLUMNS: {
//       columns: 3,
//       columnGap: 15,
//       rowGap: 10,
//       rowHeight: '100px',
//       rows: 0, // NEW: Default to 0 rows (auto)
//   },
//   STANDARD_12_COL: {
//       columns: 12,
//       columnGap: 20,
//       rowGap: 10,
//       rowHeight: '100px',
//       rows: 0, // NEW: Default to 0 rows (auto)
//   },
// };

// // Define block types for consistent usage
// export const BLOCK_TYPES = {
//   TEXT: 'text',
//   IMAGE: 'image',
//   VIDEO: 'video',
//   QUOTE: 'quote',
// };

// // Helper function to generate unique IDs for blocks
// export const generateUniqueId = (prefix = 'block-') => {
//   return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
// };

// // Default properties for new blocks when added
// export const DEFAULT_BLOCK_PROPS = {
//   [BLOCK_TYPES.TEXT]: {
//       gridColumnSpan: 4,
//       gridRowSpan: 1,
//       content: 'New Text Block. Click to edit.',
//       backgroundColor: '#d1ecf1', // light cyan
//   },
//   [BLOCK_TYPES.IMAGE]: {
//       gridColumnSpan: 4,
//       gridRowSpan: 2,
//       imageUrl: 'https://via.placeholder.com/400x300?text=New+Image',
//       altText: 'Placeholder image',
//       backgroundColor: '#d4edda', // light green
//   },
//   [BLOCK_TYPES.VIDEO]: {
//       gridColumnSpan: 6,
//       gridRowSpan: 2,
//       videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Example video
//       backgroundColor: '#ffeeba', // light yellow
//   },
//   [BLOCK_TYPES.QUOTE]: {
//       gridColumnSpan: 4,
//       gridRowSpan: 1,
//       quoteText: '“New Quote Block. Add your powerful quote here.”',
//       author: 'New Author',
//       backgroundColor: '#f8d7da', // light red
//   },
// };



// src/utils/constants.js

// src/utils/constants.js

export const DND_ITEM_TYPES = {
  BLOCK_TYPE: 'blockType', // Changed from 'block_type'
  GRID_BLOCK: 'gridBlock', // Changed from 'grid_block'
};

// Default Grid Settings
export const DEFAULT_GRID_SETTINGS = {
  columns: 12, // Default to a 12-column grid
  columnGap: 20, // Default column gap in pixels
  rowGap: 10,    // Default row gap in pixels
  rowHeight: '100px', // Default row height in pixels (as a CSS string)
  rows: 0, // Default to 0, meaning 'auto' or 'unspecified fixed height'
};

// Pre-defined grid presets
export const GRID_PRESETS = {
  FULL_WIDTH: {
      columns: 1,
      columnGap: 0,
      rowGap: 10,
      rowHeight: '100px',
      rows: 0,
  },
  TWO_COLUMNS: {
      columns: 2,
      columnGap: 20,
      rowGap: 10,
      rowHeight: '100px',
      rows: 0,
  },
  THREE_COLUMNS: {
      columns: 3,
      columnGap: 15,
      rowGap: 10,
      rowHeight: '100px',
      rows: 0,
  },
  STANDARD_12_COL: {
      columns: 12,
      columnGap: 20,
      rowGap: 10,
      rowHeight: '100px',
      rows: 0,
  },
};

// Define block types for consistent usage
export const BLOCK_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  QUOTE: 'quote',
};

// Helper function to generate unique IDs for blocks
export const generateUniqueId = (prefix = 'block-') => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Default properties for new blocks when added
export const DEFAULT_BLOCK_PROPS = {
  [BLOCK_TYPES.TEXT]: {
      gridColumnSpan: 4,
      gridRowSpan: 1,
      content: 'New Text Block. Click to edit.',
      backgroundColor: '#d1ecf1', // light cyan
  },
  [BLOCK_TYPES.IMAGE]: {
      gridColumnSpan: 4,
      gridRowSpan: 2,
      imageUrl: 'https://via.placeholder.com/400x300?text=New+Image',
      altText: 'Placeholder image',
      backgroundColor: '#d4edda', // light green
  },
  [BLOCK_TYPES.VIDEO]: {
      gridColumnSpan: 6,
      gridRowSpan: 2,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Example video
      backgroundColor: '#ffeeba', // light yellow
  },
  [BLOCK_TYPES.QUOTE]: {
      gridColumnSpan: 4,
      gridRowSpan: 1,
      quoteText: '“New Quote Block. Add your powerful quote here.”',
      author: 'New Author',
      backgroundColor: '#f8d7da', // light red
  },
};


export const DEVICE_PRESETS = {
  DESKTOP: { name: 'Desktop', width: '100%' }, // Takes full available width
  LAPTOP: { name: 'Laptop', width: '1024px' }, // Common laptop width
  TABLET: { name: 'Tablet', width: '768px' },  // Common tablet portrait width
  PHONE: { name: 'Phone', width: '375px' },    // Common phone portrait width
};