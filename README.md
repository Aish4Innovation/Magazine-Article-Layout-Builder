# Magazine-Article-Layout-Builder

## Overview

This project is a web-based application designed to help users create custom magazine-style layouts using a drag-and-drop interface. 
Users can define grid parameters, add various content blocks (text, images, videos, quotes), and arrange them dynamically on a canvas. The application also includes features for device simulation, view modes, content filtering, and metadata management, providing a comprehensive tool for digital layout design.

## Features

1. **Grid-Based Layout:** Design layouts on a flexible CSS Grid system.
 ![image](https://github.com/user-attachments/assets/4329e562-de86-4629-9e63-35f14912b17b)

2. **Custom Grid Builder:** Define custom rows, columns, and gaps.

   ![image](https://github.com/user-attachments/assets/16263098-8bd7-4cd9-ab7c-28f1a8ce9384)

3.**Resizable Grid Blocks:** Dynamically resize and reposition content blocks within the grid.
![image](https://github.com/user-attachments/assets/a9738caa-72c9-45a0-8947-7a3dcda74322)

4.**Snap-to-Grid:** Blocks automatically align to the grid for precise placement.

5.**Drag-and-Drop Editing:** Intuitive interface for adding and moving content blocks.

6.**Content Blocks:** Support for Text, Image, Video, and Quote content types.
![image](https://github.com/user-attachments/assets/8bfd3861-1137-45bb-b90d-f898eb5a2620)

7.**Block Selector Panel:** Easy access to a variety of pre-defined content blocks.
![image](https://github.com/user-attachments/assets/f5804c46-3e2e-4848-91bf-12695fa1f823)

8.**Drag-In Blocks:** Drag blocks from the library directly into the layout grid.

9.**Search & Filter:** Filter content blocks by type (e.g., "Text", "Media", "Quote").
![image](https://github.com/user-attachments/assets/ccdf8491-6375-44dc-877d-b92ce07c3bd2)
![image](https://github.com/user-attachments/assets/512b5d62-200f-4255-ba89-b6f1eeda6c1a)

10.**Media Embeds:** Embed content from YouTube, Vimeo, Twitter, Instagram.
![image](https://github.com/user-attachments/assets/0580bb63-6bfd-470c-9da2-482fe1074c88)

11.**Live Preview:** Real-time updates reflecting content and layout changes.

12.**Device Simulator:** Preview layouts on desktop, tablet, and phone.
![image](https://github.com/user-attachments/assets/30e85e18-93d0-4b98-913a-c6b1291d6da0)

13.**Content Toggle Mode:** Switch between structure view (skeleton) and full content view.
![image](https://github.com/user-attachments/assets/a7ba9798-e50d-462c-999d-026ccee7ae56)
![image](https://github.com/user-attachments/assets/7798a019-5b8b-4056-a7cb-79450a096e73)

14.**Undo/Redo History:** Step-by-step history of layout and content changes.
![image](https://github.com/user-attachments/assets/80f3e009-d70d-4e8f-82b9-abf1cc355a10)

15.**Auto Save Drafts:** Save progress locally or via API every few minutes.

16.**Metadata & Article Settings:**
– Article metadata panel: title, author, date, tags, category, estimated read time.
– SEO tags: meta title, description, and image preview.
– Editable slug/URL input for the article.
![image](https://github.com/user-attachments/assets/b9a30675-cc6a-47f1-a535-ecca1a9aac88)

17.**Publish-Ready Controls:**
– Save as draft / publish button.
– Schedule publishing with date/time picker.
– Export final layout as HTML or JSON for CMS ingestion or static rendering.
![image](https://github.com/user-attachments/assets/99469792-ef6a-4582-a951-a46fbcd7c6a2)
The downloaded JSON file has the following content - 
{
  "metadata": {
    "title": "Art in the Algorithmic Age: Is AI a True Creator?",
    "author": "Aishwarya",
    "publishDate": "2025-06-19",
    "tags": "tech, ai, computers",
    "category": "Tech",
    "estimatedReadTime": 2
  },
  "gridSettings": {
    "columns": 1,
    "columnGap": 0,
    "rowGap": 10,
    "rowHeight": "100px",
    "rows": 0,
    "null": {
      "columns": 1,
      "columnGap": 0,
      "rowGap": 10,
      "rowHeight": "100px",
      "rows": 0
    }
  },
  "layout": [
    {
      "id": "block-1750329643045-of22vfms1",
      "type": "text",
      "gridColumnStart": 6,
      "gridRowStart": 4,
      "gridColumnSpan": 7,
      "gridRowSpan": 1,
      "content": "AI Advances Leading to More Personalized Educational Tools",
      "backgroundColor": "#d1ecf1"
    },
    {
      "id": "block-1750331268163-a8dejp5u3",
      "type": "image",
      "gridColumnStart": 5,
      "gridRowStart": 7,
      "gridColumnSpan": 4,
      "gridRowSpan": 2,
      "imageUrl": "data:image/jpeg;base64,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",
      "altText": " AI",
      "backgroundColor": "#d4edda"
    },
    {
      "id": "block-1750331270262-yxjbmes72",
      "type": "video",
      "gridColumnStart": 5,
      "gridRowStart": 8,
      "gridColumnSpan": 1,
      "gridRowSpan": 4,
      "videoUrl": "https://www.youtube.com/watch?v=ad79nYk2keg",
      "backgroundColor": "#ffeeba"
    },
    {
      "id": "block-1750331272734-pvwq7df2e",
      "type": "quote",
      "gridColumnStart": 6,
      "gridRowStart": 7,
      "gridColumnSpan": 1,
      "gridRowSpan": 3,
      "quoteText": "The pace of progress in AI is accelerating. This is both exciting and terrifying.",
      "author": "Aishwarya",
      "backgroundColor": "#f8d7da"
    }
  ]
}



## Setup and Run Instructions

To set up and run this project locally, follow these steps:

### Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js:** (LTS version recommended) You can download it from [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager): Comes bundled with Node.js.


### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd magazine-builder-app
    ```
    (Replace `<your-repository-url>` with the actual URL of your GitHub repository.)

2.  **Install dependencies:**
    Navigate to the project directory and install all required npm packages:
    ```bash
    npm install
    ```
### Running the Application

1.  **Start the development server:**
    Once the dependencies are installed, you can start the application:
    ```bash
    npm start
    ```
    This will typically open the application in your default web browser at `http://localhost:3000` (or another available port).

## Dependencies

This project relies on the following key dependencies, as listed in `package.json`:

* **react**: The core React library for building user interfaces.
* **react-dom**: Provides DOM-specific methods that can be used at the top level of your web app to enable efficient updates of the HTML DOM.
* **react-scripts**: Create React App's development server, build tools, and testing setup.
* **react-dnd & react-dnd-html5-backend**: Essential for implementing the drag-and-drop functionality within the layout.
* **react-resizable**: Enables the resizing of content blocks, crucial for dynamic layout adjustments.
* **react-rnd**: A versatile component for resizing and dragging elements, providing combined functionality.
* **react-draggable**: Allows elements to be dragged around.
* **quill & react-quill**: Used for rich text editing capabilities within text blocks.
* **@testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @testing-library/dom**: Testing utilities for React components.
* **web-vitals**: For measuring and reporting on the performance of your web application.
   



    















