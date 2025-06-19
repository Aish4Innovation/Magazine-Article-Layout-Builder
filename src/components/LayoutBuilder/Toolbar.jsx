// src/components/LayoutBuilder/Toolbar.js
// src/components/LayoutBuilder/Toolbar.js

import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/layout.module.css';

const Toolbar = () => {
    const { undo, redo, canUndo, canRedo, layout, gridSettings, articleMetadata } = useLayout(); // MODIFIED: Destructure layout, gridSettings, articleMetadata

    // NEW: Function to handle exporting the layout as JSON
    const handleExportJson = () => {
        const exportData = {
            metadata: articleMetadata,
            gridSettings: gridSettings,
            layout: layout,
            // You can add more global settings here if needed in the future
        };

        const jsonString = JSON.stringify(exportData, null, 2); // Pretty print with 2 space indentation
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${articleMetadata.slug || 'magazine-article'}_layout.json`; // Use slug for filename, fallback to generic
        document.body.appendChild(a); // Append to body is required for Firefox
        a.click();
        document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(url); // Release the object URL
    };

    return (
        <div className={styles.toolbar}>
            <div className={styles.toolbarSection}>
                <button
                    onClick={undo}
                    disabled={!canUndo}
                    className={styles.toolbarButton}
                    title="Undo"
                >
                    &larr; Undo
                </button>
                <button
                    onClick={redo}
                    disabled={!canRedo}
                    className={styles.toolbarButton}
                    title="Redo"
                >
                    Redo &rarr;
                </button>
            </div>

            {/* NEW: Export JSON Button Section */}
            <div className={styles.toolbarSection}>
                <button
                    onClick={handleExportJson}
                   // Manually re-type this:
                    className={`${styles.toolbarButton} ${styles.primaryButton}`}
                    title="Export Layout as JSON"
                >
                    Export JSON
                </button>
            </div>

            {/* Add other toolbar sections/buttons here if needed in the future */}
        </div>
    );
};

export default Toolbar;