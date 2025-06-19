// import React from 'react';
// import styles from '../../styles/layout.module.css';

// function VideoBlock({ videoUrl }) {
//   return (
//     <div className={styles.videoBlock}>
//       <iframe
//         src={videoUrl}
//         title="Embedded Video"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         style={{ width: '100%', height: '100%' }}
//       />
//     </div>
//   );
// }

// export default VideoBlock;


// src/components/ContentBlocks/VideoBlock.jsx

import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';
import styles from '../../styles/layout.module.css';

// --- MODIFIED: Accept viewMode prop ---
const VideoBlock = ({ block, viewMode }) => {
    const { updateBlock } = useLayout();

    if (!block) {
        console.error("VideoBlock received an undefined or null 'block' prop. This block cannot be rendered.");
        return <div className={styles.videoBlockContent} style={{ border: '1px dashed orange', padding: '10px', color: 'orange' }}>
            Error: Video block data missing.
        </div>;
    }

    const handleVideoUrlChange = (e) => {
        updateBlock(block.id, { videoUrl: e.target.value });
    };

    // --- NEW: Conditional Rendering based on viewMode ---
    if (viewMode === 'structure') {
        return (
            <div className={`${styles.videoBlockContent} ${styles.structureBlock}`}>
                <div className={styles.structureLabel}>Video Block</div>
                <div className={styles.structureDimensions}>
                    {block.gridColumnSpan}col x {block.gridRowSpan}row
                </div>
            </div>
        );
    }

    // Basic embed logic - You might want to use a library like react-player for more robust embeds
    const renderVideoEmbed = (url) => {
        if (!url) return <div className={styles.videoPlaceholder}>No video URL provided.</div>;

        // Basic check for YouTube/Vimeo for embedding
        let embedSrc = '';
        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            embedSrc = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            embedSrc = `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('vimeo.com/')) {
            const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
            embedSrc = `https://player.vimeo.com/video/${videoId}`;
        } else {
            // For generic video files (e.g., .mp4), use <video> tag
            return (
                <video controls className={styles.blockVideo} style={{width: '100%', height: '100%'}}>
                    <source src={url} type="video/mp4" /> {/* Assuming mp4, might need more types */}
                    Your browser does not support the video tag.
                </video>
            );
        }

        if (embedSrc) {
            return (
                <iframe
                    src={embedSrc}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.blockVideo}
                    style={{ width: '100%', height: '100%' }}
                    title="Embedded video"
                ></iframe>
            );
        }
        return <div className={styles.videoPlaceholder}>Unsupported video URL format.</div>;
    };

    return (
        <div className={styles.videoBlockContent}>
            {renderVideoEmbed(block.videoUrl)}
            <input
                type="text"
                value={block.videoUrl || ''}
                onChange={handleVideoUrlChange}
                placeholder="Paste Video URL (YouTube, Vimeo, MP4) here..."
                className={styles.videoInputField}
            />
        </div>
    );
};

export default VideoBlock;