


import React, { useEffect } from 'react'; // ADDED useEffect here
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/layout.module.css';

const TextBlock = ({ block, viewMode }) => {
    const { updateBlock } = useLayout();

    // Log the block prop received by TextBlock for debugging
    useEffect(() => {
        console.log('TextBlock received block prop:', block);
        if (block && typeof block.content === 'undefined') {
            console.error('TextBlock: The "content" property is missing from the block object!', block);
        }
    }, [block]); // Log whenever the block prop changes

    // First, check if the block object itself is null or undefined
    if (!block) {
        console.error("TextBlock received an undefined or null 'block' prop. This block cannot be rendered.");
        return (
            <div className={styles.textBlockContent} style={{ border: '1px dashed red', padding: '10px', color: 'red' }}>
                Error: Text block data (object) missing.
            </div>
        );
    }

    // Now, check if the specific 'content' property is missing for a text block
    // This handles cases where the block object exists, but its content is malformed.
    if (typeof block.content === 'undefined') {
        console.error(`TextBlock with ID ${block.id || 'N/A'}: The 'content' property is undefined.`);
        return (
            <div className={styles.textBlockContent} style={{ border: '1px dashed orange', padding: '10px', color: 'orange' }}>
                Error: Text block content property missing.
            </div>
        );
    }

    const handleContentChange = (e) => {
        if (block.id) {
            updateBlock(block.id, { content: e.target.value });
        } else {
            console.warn("Attempted to update a TextBlock with no ID. Content not saved.");
        }
    };

    if (viewMode === 'structure') {
        return (
            <div className={`${styles.textBlockContent} ${styles.structureBlock}`}>
                <div className={styles.structureLabel}>Text Block</div>
                <div className={styles.structureDimensions}>
                    {block.gridColumnSpan}col x {block.gridRowSpan}row
                </div>
            </div>
        );
        }

    return (
        <div className={styles.textBlockContent}>
            <textarea
                className={styles.plainTextEditor}
                value={block.content || ''} // Ensure it defaults to empty string if content is null/undefined
                onChange={handleContentChange}
                placeholder="Type your content here..."
                style={{ width: '100%', height: '100%', border: 'none', resize: 'none', padding: '5px', boxSizing: 'border-box' }}
            />
        </div>
    );
};

export default TextBlock;
