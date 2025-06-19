// src/components/LayoutBuilder/BlockSelectorPanel.jsx

import React, { useState } from 'react';
import { BLOCK_TYPES, DEFAULT_BLOCK_PROPS, DND_ITEM_TYPES } from '../../utils/constants';
import { useDrag } from 'react-dnd';
import styles from '../../styles/layout.module.css';

// Move capitalize helper function here, making it accessible to both components
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function BlockSelectorPanel() {
  const availableBlockTypes = Object.values(BLOCK_TYPES);

  // State for search query and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Text', 'Media', 'Other'

  // Filter and search logic for available blocks
  const filteredBlockTypes = availableBlockTypes.filter(type => {
    const matchesSearch = type.toLowerCase().includes(searchQuery.toLowerCase());

    const isMedia = [BLOCK_TYPES.IMAGE, BLOCK_TYPES.VIDEO].includes(type);
    const isText = type === BLOCK_TYPES.TEXT;
    const isQuote = type === BLOCK_TYPES.QUOTE;

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Text' && isText) ||
      (activeFilter === 'Media' && isMedia) ||
      (activeFilter === 'Quote' && isQuote);


    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.sidebarSection}>
      <h4>Add Content Blocks</h4>

      {/* NEW: Search Input */}
      <div className={styles.searchFilterGroup}>
        <input
          type="text"
          placeholder="Search blocks..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* NEW: Filter Buttons */}
      <div className={styles.filterButtonGroup}>
        <button
          className={`${styles.filterButton} ${activeFilter === 'All' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
        <button
          className={`${styles.filterButton} ${activeFilter === 'Text' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('Text')}
        >
          Text
        </button>
        <button
          className={`${styles.filterButton} ${activeFilter === 'Media' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('Media')}
        >
          Media
        </button>
        <button
          className={`${styles.filterButton} ${activeFilter === 'Quote' ? styles.activeFilter : ''}`}
          onClick={() => setActiveFilter('Quote')}
        >
          Quote
        </button>
      </div>

      <div className={styles.buttonGroup}>
        {filteredBlockTypes.length > 0 ? (
          filteredBlockTypes.map((type) => (
            <DraggableBlockButton key={type} type={type} />
          ))
        ) : (
          <p className={styles.noResults}>No blocks found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

// DraggableBlockButton component (remains mostly the same)
const DraggableBlockButton = ({ type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DND_ITEM_TYPES.BLOCK_TYPE,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Helper to get display name (e.g., "Add Text Block")
  const getDisplayName = (blockType) => {
    switch (blockType) {
      case BLOCK_TYPES.TEXT: return 'Add Text Block';
      case BLOCK_TYPES.IMAGE: return 'Add Image Block';
      case BLOCK_TYPES.VIDEO: return 'Add Video Block';
      case BLOCK_TYPES.QUOTE: return 'Add Quote Block';
      default: return `Add ${capitalize(blockType)} Block`; // 'capitalize' is now accessible
    }
  };

  return (
    <button
      ref={drag}
      className={styles.addBlockButton}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {getDisplayName(type)}
    </button>
  );
};


export default BlockSelectorPanel;