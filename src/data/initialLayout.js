// src/data/initialLayout.js

// This should export an array of initial blocks.
// If you want an empty canvas initially, just export an empty array.
const initialLayout = [
    // Example initial block (you can remove or modify this)
    {
      id: 'initial-text-1',
      type: 'text',
      content: 'Main Article Title. This is a longer text block to demonstrate content flow.',
      gridColumnStart: 1,
      gridColumnSpan: 12,
      gridRowStart: 1,
      gridRowSpan: 1,
      backgroundColor: '#add8e6', // light blue
    },
    {
      id: 'initial-image-1',
      type: 'image',
      imageUrl: 'https://react.dev/images/og-home.png', // Example React logo
      altText: 'Magazine cover image',
      gridColumnStart: 1,
      gridColumnSpan: 4,
      gridRowStart: 2,
      gridRowSpan: 2,
      backgroundColor: '#90ee90', // light green
    },
    {
      id: 'initial-text-2',
      type: 'text',
      content: 'Introduction text for the article. This is a longer text block to demonstrate content flow.',
      gridColumnStart: 5,
      gridColumnSpan: 8,
      gridRowStart: 2,
      gridRowSpan: 1,
      backgroundColor: '#add8e6', // light blue
    },
    {
      id: 'initial-quote-1',
      type: 'quote',
      quoteText: 'A powerful quote from an expert: "The only way to do great work is to love what you do."',
      author: 'Steve Jobs',
      gridColumnStart: 5,
      gridColumnSpan: 4,
      gridRowStart: 3,
      gridRowSpan: 1,
      backgroundColor: '#ffb6c1', // light pink
    },
    {
      id: 'initial-video-1',
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
      gridColumnStart: 1,
      gridColumnSpan: 7,
      gridRowStart: 4,
      gridRowSpan: 2,
      backgroundColor: '#ffa07a', // light orange
    },
    {
      id: 'initial-text-3',
      type: 'text',
      content: 'More body text, continuing the article narrative. This is another longer text block, showcasing how content flows within the magazine layout.',
      gridColumnStart: 8,
      gridColumnSpan: 5,
      gridRowStart: 4,
      gridRowSpan: 2,
      backgroundColor: '#d3d3d3', // light gray
    },
  ];
  
  export default initialLayout;