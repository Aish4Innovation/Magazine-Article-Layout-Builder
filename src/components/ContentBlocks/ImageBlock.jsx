// import React from 'react';
// import styles from '../../styles/layout.module.css';

// function ImageBlock({ imageUrl, altText }) {
//   return (
//     <div className={styles.imageBlock}>
//       <img src={imageUrl} alt={altText} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
//       {altText && <p className={styles.imageCaption}>{altText}</p>}
//     </div>
//   );
// }

// export default ImageBlock;


// src/components/ContentBlocks/ImageBlock.jsx

import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/layout.module.css';

// --- MODIFIED: Accept viewMode prop ---
const ImageBlock = ({ block, viewMode }) => {
    const { updateBlock } = useLayout();

    if (!block) {
        console.error("ImageBlock received an undefined or null 'block' prop. This block cannot be rendered.");
        return (
            <div className={styles.imageBlockContent} style={{ border: '1px dashed blue', padding: '10px', color: 'blue' }}>
                Error: Image block data missing.
            </div>
        );
    }

    const handleImageUrlChange = (e) => {
        updateBlock(block.id, { imageUrl: e.target.value });
    };

    const handleAltTextChange = (e) => {
        updateBlock(block.id, { altText: e.target.value });
    };

    // --- NEW: Conditional Rendering based on viewMode ---
    if (viewMode === 'structure') {
        return (
            <div className={`${styles.imageBlockContent} ${styles.structureBlock}`}>
                <div className={styles.structureLabel}>Image Block</div>
                <div className={styles.structureDimensions}>
                    {block.gridColumnSpan}col x {block.gridRowSpan}row
                </div>
            </div>
        );
    }

    return (
        <div className={styles.imageBlockContent}>
            {block.imageUrl ? (
                <img
                    src={block.imageUrl}
                    alt={block.altText || 'User-uploaded image'}
                    className={styles.blockImage}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        margin: '0 auto',
                    }}
                />
            ) : (
                <div className={styles.imagePlaceholder}>
                    No image provided. Paste URL below.
                </div>
            )}

            <input
                type="text"
                value={block.imageUrl || ''}
                onChange={handleImageUrlChange}
                placeholder="Paste Image URL here..."
                className={styles.imageInputField}
            />

            <input
                type="text"
                value={block.altText || ''}
                onChange={handleAltTextChange}
                placeholder="Alt Text (for SEO & accessibility)"
                className={styles.imageInputField}
                style={{ marginTop: '5px' }}
            />
        </div>
    );
};

export default ImageBlock;