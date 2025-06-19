// src/App.js

import React from 'react';
import { LayoutProvider } from './contexts/LayoutContext';
import LayoutCanvas from './components/LayoutBuilder/LayoutCanvas';
import ArticleSettingsPanel from './components/LayoutBuilder/ArticleSettingsPanel';
import styles from './styles/layout.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Toolbar from './components/LayoutBuilder/Toolbar';
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LayoutProvider>
        <div className={styles.appContainer}>
        <Toolbar />
          {/* NEW: Header for the main title */}
          <header className={styles.appHeader}>
            <h1>MAGAZINE LAYOUT BUILDER</h1> {/* Main application title */}
          </header>

          {/* This main area will contain the canvas and the sidebar */}
          <main className={styles.mainLayoutArea}> {/* Renamed from mainContent to avoid confusion */}
            <LayoutCanvas />
            <ArticleSettingsPanel />
          </main>

          {/* Optional: Add a footer here if needed */}
          {/* <footer className={styles.appFooter}>© 2023 Your Magazine Builder</footer> */}
        </div>
      </LayoutProvider>
    </DndProvider>
  );
}

export default App;