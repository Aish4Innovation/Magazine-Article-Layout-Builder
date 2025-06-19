

import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/layout.module.css';

// --- MODIFIED: Accept viewMode prop ---
const QuoteBlock = ({ block, viewMode }) => {
    const { updateBlock } = useLayout();

    if (!block) {
        console.error("QuoteBlock received an undefined or null 'block' prop. This block cannot be rendered.");
        return <div className={styles.quoteBlockContent} style={{ border: '1px dashed purple', padding: '10px', color: 'purple' }}>
            Error: Quote block data missing.
        </div>;
    }

    const handleQuoteTextChange = (e) => {
        updateBlock(block.id, { quoteText: e.target.value });
    };

    const handleAuthorChange = (e) => {
        updateBlock(block.id, { author: e.target.value });
    };

    // --- NEW: Conditional Rendering based on viewMode ---
    if (viewMode === 'structure') {
        return (
            <div className={`${styles.quoteBlockContent} ${styles.structureBlock}`}>
                <div className={styles.structureLabel}>Quote Block</div>
                <div className={styles.structureDimensions}>
                    {block.gridColumnSpan}col x {block.gridRowSpan}row
                </div>
            </div>
        );
    }

    return (
        <div className={styles.quoteBlockContent}>
            <blockquote className={styles.quoteText}>
                <textarea
                    value={block.quoteText || ''}
                    onChange={handleQuoteTextChange}
                    placeholder="“Enter your powerful quote here.”"
                    className={styles.quoteTextarea}
                    style={{ width: '100%', height: 'calc(100% - 30px)', border: 'none', resize: 'none', fontStyle: 'italic', boxSizing: 'border-box' }}
                />
            </blockquote>
            <input
                type="text"
                value={block.author || ''}
                onChange={handleAuthorChange}
                placeholder="— Author Name"
                className={styles.quoteAuthorInput}
                style={{ width: '100%', border: 'none', textAlign: 'right', boxSizing: 'border-box' }}
            />
        </div>
    );
};

export default QuoteBlock;
