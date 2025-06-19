// src/components/LayoutBuilder/ArticleSettingsPanel.jsx

// import React from 'react';
// import { useLayout } from '../../contexts/LayoutContext';
// import { GRID_PRESETS } from '../../utils/constants'; // Ensure GRID_PRESETS is imported
// import BlockSelectorPanel from './BlockSelectorPanel';
// import styles from '../../styles/layout.module.css';

// function ArticleSettingsPanel() {
//   const { gridSettings, updateGridSettings } = useLayout();

//   const handleGridSettingChange = (e) => {
//     const { name, value } = e.target;
//     let newValue;

//     if (name === 'rowHeight') {
//       newValue = `${parseFloat(value)}px`;
//       if (isNaN(parseFloat(value))) newValue = '0px'; // Handle empty input for rowHeight
//     } else {
//       newValue = parseInt(value, 10);
//       if (isNaN(newValue) || newValue < 0) { // Basic validation for numbers
//         newValue = 0; // Set to 0 or a sensible default
//       }
//     }

//     updateGridSettings({ ...gridSettings, [name]: newValue });
//   };

//   const applyPreset = (presetName) => {
//     updateGridSettings(GRID_PRESETS[presetName]);
//   };

//   // Helper function to check if the current gridSettings precisely match a specific preset
//   const isPresetActive = (preset) => {
//     return (
//       gridSettings.columns === preset.columns &&
//       gridSettings.columnGap === preset.columnGap &&
//       gridSettings.rowGap === preset.rowGap &&
//       gridSettings.rowHeight === preset.rowHeight &&
//       // NEW: Compare rows as well
//       gridSettings.rows === preset.rows
//     );
//   };

//   return (
//     <div className={styles.sidebar}>
//       {/* Feature 2: Layout & Grid Settings */}
//       <div className={styles.sidebarSection}>
//         <h4>Layout & Grid Settings</h4>
//         <div className={styles.formGroup}>
//           <label htmlFor="columns">Columns:</label>
//           <input
//             type="number"
//             id="columns"
//             name="columns"
//             value={gridSettings.columns}
//             onChange={handleGridSettingChange}
//             min="1"
//             className={styles.settingInput}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="rows">Rows:</label> {/* NEW INPUT */}
//           <input
//             type="number"
//             id="rows"
//             name="rows"
//             value={gridSettings.rows}
//             onChange={handleGridSettingChange}
//             min="0" // 0 for auto, 1+ for fixed rows
//             className={styles.settingInput}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="columnGap">Column Gap (px):</label>
//           <input
//             type="number"
//             id="columnGap"
//             name="columnGap"
//             value={gridSettings.columnGap}
//             onChange={handleGridSettingChange}
//             min="0"
//             className={styles.settingInput}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="rowGap">Row Gap (px):</label>
//           <input
//             type="number"
//             id="rowGap"
//             name="rowGap"
//             value={gridSettings.rowGap}
//             onChange={handleGridSettingChange}
//             min="0"
//             className={styles.settingInput}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label htmlFor="rowHeight">Row Height (px):</label>
//           <input
//             type="number"
//             id="rowHeight"
//             name="rowHeight"
//             // Display rowHeight as a number by stripping 'px' for the input field
//             value={gridSettings.rowHeight ? String(parseFloat(gridSettings.rowHeight.replace('px', ''))) : ''}
//             onChange={handleGridSettingChange}
//             min="1"
//             className={styles.settingInput}
//           />
//         </div>
//       </div>

//       {/* Feature 2: Layout Presets */}
//       <div className={styles.sidebarSection}>
//         <h4>Layout Presets</h4>
//         <div className={styles.buttonGroup}>
//           <button
//             className={`${styles.layoutPresetButton} ${isPresetActive(GRID_PRESETS.FULL_WIDTH) ? styles.active : ''}`}
//             onClick={() => applyPreset('FULL_WIDTH')}
//           >
//             Full Width (1 Col)
//           </button>
//           <button
//             className={`${styles.layoutPresetButton} ${isPresetActive(GRID_PRESETS.TWO_COLUMNS) ? styles.active : ''}`}
//             onClick={() => applyPreset('TWO_COLUMNS')}
//           >
//             2 Columns
//           </button>
//           <button
//             className={`${styles.layoutPresetButton} ${isPresetActive(GRID_PRESETS.THREE_COLUMNS) ? styles.active : ''}`}
//             onClick={() => applyPreset('THREE_COLUMNS')}
//           >
//             3 Columns
//           </button>
//           <button
//             className={`${styles.layoutPresetButton} ${isPresetActive(GRID_PRESETS.STANDARD_12_COL) ? styles.active : ''}`}
//             onClick={() => applyPreset('STANDARD_12_COL')}
//           >
//             Standard (12 Col)
//           </button>
//         </div>
//       </div>

//       {/* Feature 7: Block Selector Panel */}
//       <BlockSelectorPanel />

//       {/* Article Metadata Section (Placeholder for Feature 16) */}
//       <div className={styles.sidebarSection}>
//         <h4>Article Metadata</h4>
//         <p className={styles.placeholderText}>Metadata controls coming soon...</p>
//       </div>
//     </div>
//   );
// }

// export default ArticleSettingsPanel;




// src/components/LayoutBuilder/ArticleSettingsPanel.jsx

// src/components/LayoutBuilder/ArticleSettingsPanel.js

import React, { useState } from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import { GRID_PRESETS, BLOCK_TYPES, DND_ITEM_TYPES, DEVICE_PRESETS } from '../../utils/constants';
import { useDrag, useDrop } from 'react-dnd';
import styles from '../../styles/layout.module.css';

// Draggable BlockType component (No changes needed here)
const DraggableBlockType = ({ type, label }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DND_ITEM_TYPES.BLOCK_TYPE,
        item: {
            type: DND_ITEM_TYPES.BLOCK_TYPE,
            blockType: type
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [type]);

    return (
        <button
            ref={drag}
            className={`${styles.addBlockButton} ${isDragging ? styles.dragging : ''}`}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {label}
        </button>
    );
};


const ArticleSettingsPanel = () => {
    // --- MODIFIED: Destructure articleMetadata and updateArticleMetadata from useLayout ---
    const {
        gridSettings,
        updateGridSetting,
        setDeviceSimulatorMode,
        viewMode,
        setViewMode,
        deviceMode,
        deleteBlock,
        articleMetadata,      // NEW
        updateArticleMetadata // NEW
    } = useLayout();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const handleGridPresetClick = (preset) => {
        updateGridSetting(null, preset);
    };

    const isActivePreset = (preset) => {
        // This logic needs to match the way presets update gridSettings
        // If presets update `columns` and `rows`, then this check is fine.
        return gridSettings.columns === preset.columns && gridSettings.rows === preset.rows;
    };


    const filteredBlockTypes = Object.entries(BLOCK_TYPES).filter(([key, type]) => {
        const label = `Add ${key.charAt(0)}${key.slice(1).toLowerCase()} Block`;
        const matchesSearch = label.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === 'All' ||
            (activeFilter === 'Text' && type === BLOCK_TYPES.TEXT) ||
            (activeFilter === 'Media' && (type === BLOCK_TYPES.IMAGE || type === BLOCK_TYPES.VIDEO)) ||
            (activeFilter === 'Quote' && type === BLOCK_TYPES.QUOTE);
        return matchesSearch && matchesFilter;
    });

    const getBlockLabel = (type) => {
        switch (type) {
            case BLOCK_TYPES.TEXT: return "Add Text Block";
            case BLOCK_TYPES.IMAGE: return "Add Image Block";
            case BLOCK_TYPES.VIDEO: return "Add Video Block";
            case BLOCK_TYPES.QUOTE: return "Add Quote Block";
            default: return "Add Block";
        }
    };

    // --- NEW CODE: useDrop hook for deleting blocks (already there, just ensuring it's shown for context) ---
    const [{ isOverSidebar }, dropRef] = useDrop(() => ({
        accept: DND_ITEM_TYPES.GRID_BLOCK,
        drop: (item, monitor) => {
            if (item && item.id && monitor.isOver({ shallow: true })) {
                deleteBlock(item.id);
            }
        },
        collect: (monitor) => ({
            isOverSidebar: monitor.isOver({ shallow: true }),
        }),
    }), [deleteBlock]);

    return (
        <div
            ref={dropRef}
            className={`${styles.articleSettingsPanel} ${isOverSidebar ? styles.sidebarDropTargetActive : ''}`}
        >
            <h3>Layout & Grid Settings</h3>
            <div className={styles.settingsGroup}>
                <label>Columns:</label>
                <input
                    type="number"
                    value={gridSettings.columns}
                    onChange={(e) => updateGridSetting('columns', parseInt(e.target.value))}
                />
            </div>
            <div className={styles.settingsGroup}>
                <label>Rows:</label>
                <input
                    type="number"
                    value={gridSettings.rows}
                    onChange={(e) => updateGridSetting('rows', parseInt(e.target.value))}
                />
            </div>
            <div className={styles.settingsGroup}>
                <label>Column Gap (px):</label>
                <input
                    type="number"
                    value={gridSettings.columnGap}
                    onChange={(e) => updateGridSetting('columnGap', parseInt(e.target.value))}
                />
            </div>
            <div className={styles.settingsGroup}>
                <label>Row Gap (px):</label>
                <input
                    type="number"
                    value={gridSettings.rowGap}
                    onChange={(e) => updateGridSetting('rowGap', parseInt(e.target.value))}
                />
            </div>
            <div className={styles.settingsGroup}>
                <label>Row Height (px):</label>
                <input
                    type="text"
                    value={gridSettings.rowHeight}
                    onChange={(e) => updateGridSetting('rowHeight', e.target.value)}
                    placeholder="e.g., 100px or auto"
                />
            </div>

            <h4>Layout Presets</h4>
            <div className={styles.presetButtons}>
                <button
                    className={isActivePreset(GRID_PRESETS.FULL_WIDTH) ? styles.activePreset : ''}
                    onClick={() => handleGridPresetClick(GRID_PRESETS.FULL_WIDTH)}
                >
                    Full Width (1 Col)
                </button>
                <button
                    className={isActivePreset(GRID_PRESETS.TWO_COLUMNS) ? styles.activePreset : ''}
                    onClick={() => handleGridPresetClick(GRID_PRESETS.TWO_COLUMNS)}
                >
                    2 Columns
                </button>
                <button
                    className={isActivePreset(GRID_PRESETS.THREE_COLUMNS) ? styles.activePreset : ''}
                    onClick={() => handleGridPresetClick(GRID_PRESETS.THREE_COLUMNS)}
                >
                    3 Columns
                </button>
                <button
                    className={isActivePreset(GRID_PRESETS.STANDARD_12_COL) ? styles.activePreset : ''}
                    onClick={() => handleGridPresetClick(GRID_PRESETS.STANDARD_12_COL)}
                >
                    Standard (12 Col)
                </button>
            </div>

            <h4>Device Simulator</h4>
            <div className={styles.deviceButtons}>
                <button className={deviceMode.name === DEVICE_PRESETS.DESKTOP.name ? styles.activeDeviceMode : ''} onClick={() => setDeviceSimulatorMode('DESKTOP')}>Desktop</button>
                <button className={deviceMode.name === DEVICE_PRESETS.LAPTOP.name ? styles.activeDeviceMode : ''} onClick={() => setDeviceSimulatorMode('LAPTOP')}>Laptop</button>
                <button className={deviceMode.name === DEVICE_PRESETS.TABLET.name ? styles.activeDeviceMode : ''} onClick={() => setDeviceSimulatorMode('TABLET')}>Tablet</button>
                <button className={deviceMode.name === DEVICE_PRESETS.PHONE.name ? styles.activeDeviceMode : ''} onClick={() => setDeviceSimulatorMode('PHONE')}>Phone</button>
            </div>

            <h4>View Mode</h4>
            <div className={styles.viewModeToggle}>
                <button
                    className={viewMode === 'content' ? styles.activeViewMode : ''}
                    onClick={() => setViewMode('content')}
                >
                    Content View
                </button>
                <button
                    className={viewMode === 'structure' ? styles.activeViewMode : ''}
                    onClick={() => setViewMode('structure')}
                >
                    Structure View
                </button>
            </div>

            <h4>Add Content Blocks</h4>
            <div className={styles.settingsGroup} style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Search blocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.blockFilterButtons}>
                {['All', 'Text', 'Media', 'Quote'].map((filter) => (
                    <button
                        key={filter}
                        className={activeFilter === filter ? styles.activeFilter : ''}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div className={styles.addBlockButtons}>
                {filteredBlockTypes.map(([key, type]) => (
                    <DraggableBlockType key={type} type={type} label={getBlockLabel(type)} />
                ))}
            </div>

            {isOverSidebar && (
                <div className={styles.deleteZoneFeedback}>
                    Drag here to delete block
                </div>
            )}

            {/* --- NEW CODE: Article Metadata Section --- */}
            <h4>Article Metadata</h4>
            <div className={styles.settingsGroup}>
                <label htmlFor="articleTitle">Title:</label>
                <input
                    id="articleTitle"
                    type="text"
                    value={articleMetadata.title}
                    onChange={(e) => updateArticleMetadata('title', e.target.value)}
                    placeholder="Article Title"
                />
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="articleAuthor">Author:</label>
                <input
                    id="articleAuthor"
                    type="text"
                    value={articleMetadata.author}
                    onChange={(e) => updateArticleMetadata('author', e.target.value)}
                    placeholder="Author Name"
                />
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="publishDate">Publish Date:</label>
                <input
                    id="publishDate"
                    type="date"
                    value={articleMetadata.publishDate}
                    onChange={(e) => updateArticleMetadata('publishDate', e.target.value)}
                />
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="articleTags">Tags (comma-separated):</label>
                <input
                    id="articleTags"
                    type="text"
                    value={articleMetadata.tags}
                    onChange={(e) => updateArticleMetadata('tags', e.target.value)}
                    placeholder="tag1, tag2, tag3"
                />
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="articleCategory">Category:</label>
                <input
                    id="articleCategory"
                    type="text"
                    value={articleMetadata.category}
                    onChange={(e) => updateArticleMetadata('category', e.target.value)}
                    placeholder="e.g., News, Tech"
                />
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="estimatedReadTime">Est. Read Time (mins):</label>
                <input
                    id="estimatedReadTime"
                    type="number"
                    value={articleMetadata.estimatedReadTime}
                    onChange={(e) => updateArticleMetadata('estimatedReadTime', parseInt(e.target.value) || '')}
                    placeholder="e.g., 5"
                />
            </div>

            {/* SEO Tags */}
            <h4>SEO Tags</h4>
            <div className={styles.settingsGroup}>
                <label htmlFor="metaTitle">Meta Title:</label>
                <input
                    id="metaTitle"
                    type="text"
                    value={articleMetadata.metaTitle}
                    onChange={(e) => updateArticleMetadata('metaTitle', e.target.value)}
                    placeholder="SEO friendly title"
                />
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="metaDescription">Meta Description:</label>
                <textarea
                    id="metaDescription"
                    value={articleMetadata.metaDescription}
                    onChange={(e) => updateArticleMetadata('metaDescription', e.target.value)}
                    placeholder="Brief description for search engines"
                    rows="3"
                ></textarea>
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="metaImage">Meta Image URL:</label>
                <input
                    id="metaImage"
                    type="text"
                    value={articleMetadata.metaImage}
                    onChange={(e) => updateArticleMetadata('metaImage', e.target.value)}
                    placeholder="URL for social media preview image"
                />
                {articleMetadata.metaImage && (
                    <div className={styles.imagePreview}>
                        <img src={articleMetadata.metaImage} alt="Meta Preview" />
                        <p>Image Preview</p>
                    </div>
                )}
            </div>
            <div className={styles.settingsGroup}>
                <label htmlFor="articleSlug">Slug/URL:</label>
                <input
                    id="articleSlug"
                    type="text"
                    value={articleMetadata.slug}
                    onChange={(e) => updateArticleMetadata('slug', e.target.value)}
                    placeholder="unique-article-slug"
                />
            </div>

        </div>
    );
};

export default ArticleSettingsPanel;