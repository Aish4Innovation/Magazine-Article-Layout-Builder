import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // Import global styles
import { DndProvider } from 'react-dnd'; // NEW IMPORT
import { HTML5Backend } from 'react-dnd-html5-backend'; // NEW IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}> {/* NEW: Wrap App with DndProvider */}
      <App />
    </DndProvider>
  </React.StrictMode>
);