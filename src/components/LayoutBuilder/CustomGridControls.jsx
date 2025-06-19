import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import { COLUMN_PRESETS } from '../../utils/constants'; // New Import
import styles from '../../styles/layout.module.css'; // Use shared layout styles

function CustomGridControls() {
  const { gridSettings, updateGridSettings } = useLayout();

  const handleColumnsChange = (e) => {
    const newColumns = parseInt(e.target.value, 10);
    if (!isNaN(newColumns) && newColumns > 0) {
      updateGridSettings({ columns: newColumns });
    }
  };

  const handleGapChange = (e, type) => {
    const newGap = parseInt(e.target.value, 10);
    if (!isNaN(newGap) && newGap >= 0) {
      updateGridSettings({ [type]: newGap });
    }
  };

  const applyPreset = (columns) => {
    updateGridSettings({ columns: columns });
    // Note: For a more advanced template, you might also load
    // a predefined set of blocks here, but for now, just change grid.
    // E.g., setBlocks(getPresetBlocks(columns));
  };

  return (
    <div className={styles.customGridControls}>
      <h5>Grid Dimensions</h5>
      <div className={styles.controlGroup}>
        <label htmlFor="columns">Columns:</label>
        <input
          id="columns"
          type="number"
          min="1"
          value={gridSettings.columns}
          onChange={handleColumnsChange}
          className={styles.inputField}
        />
      </div>

      <div className={styles.controlGroup}>
        <label htmlFor="columnGap">Column Gap (px):</label>
        <input
          id="columnGap"
          type="number"
          min="0"
          value={gridSettings.columnGap}
          onChange={(e) => handleGapChange(e, 'columnGap')}
          className={styles.inputField}
        />
      </div>

      <div className={styles.controlGroup}>
        <label htmlFor="rowGap">Row Gap (px):</label>
        <input
          id="rowGap"
          type="number"
          min="0"
          value={gridSettings.rowGap}
          onChange={(e) => handleGapChange(e, 'rowGap')}
          className={styles.inputField}
        />
      </div>

      <h5 style={{marginTop: '20px'}}>Layout Presets</h5>
      <div className={styles.presetButtons}>
        {COLUMN_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => applyPreset(preset.value)}
            className={`${styles.presetButton} ${gridSettings.columns === preset.value ? styles.activePreset : ''}`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CustomGridControls;