// // src/contexts/LayoutContext.jsx

// import React, { createContext, useContext, useState, useCallback } from 'react';
// import initialLayout from '../data/initialLayout'; // Import your initial layout data
// import { DEFAULT_GRID_SETTINGS } from '../utils/constants'; // Import default grid settings

// const LayoutContext = createContext();

// export const LayoutProvider = ({ children }) => {
//   // Initialize layout state with data from initialLayout.js
//   const [layout, setLayout] = useState(initialLayout);
//   // Initialize grid settings with default values
//   const [gridSettings, setGridSettings] = useState(DEFAULT_GRID_SETTINGS);

//   const addBlock = useCallback((newBlock) => {
//     setLayout((prevLayout) => [...prevLayout, newBlock]);
//   }, []);

//   const updateBlock = useCallback((id, updates) => {
//     setLayout((prevLayout) =>
//       prevLayout.map((block) =>
//         block.id === id ? { ...block, ...updates } : block
//       )
//     );
//   }, []);

//   // You'll add deleteBlock, undo/redo etc. here later

//   const value = {
//     layout,
//     gridSettings,
//     addBlock,
//     updateBlock,
//     updateGridSettings: setGridSettings, // Provide a way to update grid settings
//   };

//   return (
//     <LayoutContext.Provider value={value}>
//       {children}
//     </LayoutContext.Provider>
//   );
// };

// export const useLayout = () => {
//   const context = useContext(LayoutContext);
//   if (context === undefined) {
//     throw new Error('useLayout must be used within a LayoutProvider');
//   }
//   return context;
// };


// src/contexts/LayoutContext.jsx



// src/contexts/LayoutContext.js
// src/contexts/LayoutContext.js

import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react'; // NEW: Import useRef
import { generateUniqueId, DEFAULT_GRID_SETTINGS, DEFAULT_BLOCK_PROPS, DEVICE_PRESETS } from '../utils/constants';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    // --- MODIFIED: Load initial state for all relevant parts from localStorage ---
    const loadInitialState = () => {
        try {
            const savedState = localStorage.getItem('magazineLayoutBuilder'); // Assuming a single key for all state
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                return {
                    layout: parsedState.layout || [],
                    gridSettings: parsedState.gridSettings || DEFAULT_GRID_SETTINGS,
                    deviceMode: parsedState.deviceMode || DEVICE_PRESETS.DESKTOP,
                    viewMode: parsedState.viewMode || 'content',
                    articleMetadata: parsedState.articleMetadata || {
                        title: '',
                        author: '',
                        publishDate: '',
                        tags: '',
                        category: '',
                        estimatedReadTime: '',
                        metaTitle: '',
                        metaDescription: '',
                        metaImage: '',
                        slug: '',
                    },
                };
            }
        } catch (error) {
            console.error("Failed to load initial state from localStorage", error);
        }
        // Default initial state if nothing in localStorage or error
        return {
            layout: [],
            gridSettings: DEFAULT_GRID_SETTINGS,
            deviceMode: DEVICE_PRESETS.DESKTOP,
            viewMode: 'content',
            articleMetadata: {
                title: '',
                author: '',
                publishDate: '',
                tags: '',
                category: '',
                estimatedReadTime: '',
                metaTitle: '',
                metaDescription: '',
                metaImage: '',
                slug: '',
            },
        };
    };

    const initialState = loadInitialState();

    // State for grid settings
    const [gridSettings, setGridSettings] = useState(initialState.gridSettings);

    // State for the layout (array of blocks)
    const [layout, setLayout] = useState(initialState.layout);

    // State for device simulator mode (e.g., 'DESKTOP', 'TABLET')
    const [deviceMode, setDeviceMode] = useState(initialState.deviceMode);

    // State for view mode ('content' or 'structure')
    const [viewMode, setViewMode] = useState(initialState.viewMode);

    // State for article metadata
    const [articleMetadata, setArticleMetadata] = useState(initialState.articleMetadata);

    // NEW: State for history management
    // History will store snapshots of { layout, gridSettings, articleMetadata }
    const [history, setHistory] = useState([
        { layout: initialState.layout, gridSettings: initialState.gridSettings, articleMetadata: initialState.articleMetadata }
    ]);
    const [historyPointer, setHistoryPointer] = useState(0);

    // A ref to prevent the initial useEffect from saving to history
    const isInitialMount = useRef(true);

    // --- MODIFIED: Single useEffect to save all relevant state to localStorage and manage history ---
    useEffect(() => {
        // Prevent saving to history on initial mount (only load from localStorage)
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Create a snapshot of the current relevant state
        const currentSnapshot = { layout, gridSettings, articleMetadata };

        setHistory(prevHistory => {
            // Trim history if we're not at the latest point (e.g., after an undo)
            const newHistory = prevHistory.slice(0, historyPointer + 1);
            // Add the new snapshot
            return [...newHistory, currentSnapshot];
        });
        setHistoryPointer(prevPointer => prevPointer + 1);

        // Auto-save to localStorage
        try {
            localStorage.setItem('magazineLayoutBuilder', JSON.stringify({
                layout,
                gridSettings,
                deviceMode,
                viewMode,
                articleMetadata,
            }));
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }, [layout, gridSettings, articleMetadata]); // Removed deviceMode, viewMode from history dependencies for simplicity as they don't change content/layout structure

    // NEW: Function to restore a specific state from history
    const restoreState = useCallback((index) => {
        if (index >= 0 && index < history.length) {
            const stateToRestore = history[index];
            // Temporarily disable history recording during restoration
            isInitialMount.current = true; // Use this as a flag to prevent history save on state updates below

            setLayout(stateToRestore.layout);
            setGridSettings(stateToRestore.gridSettings);
            setArticleMetadata(stateToRestore.articleMetadata);
            setHistoryPointer(index);

            // Re-enable history recording after state is set
            // Use a timeout to ensure state updates have propagated before re-enabling
            setTimeout(() => {
                isInitialMount.current = false;
            }, 0);
        }
    }, [history]);

    // NEW: Undo function
    const undo = useCallback(() => {
        if (historyPointer > 0) {
            restoreState(historyPointer - 1);
        }
    }, [historyPointer, restoreState]);

    // NEW: Redo function
    const redo = useCallback(() => {
        if (historyPointer < history.length - 1) {
            restoreState(historyPointer + 1);
        }
    }, [historyPointer, history.length, restoreState]);

    // Function to update individual grid settings or apply a preset
    const updateGridSetting = useCallback((key, value) => {
        setGridSettings(prevSettings => {
            if (value && typeof value === 'object' && value.columns !== undefined) {
                setDeviceMode(prevDeviceMode => ({
                    ...prevDeviceMode,
                    defaultColumns: value.columns
                }));
                return { ...prevSettings, ...value };
            }
            return { ...prevSettings, [key]: value };
        });
    }, []);

    // Function to set device simulator mode
    const setDeviceSimulatorMode = useCallback((modeKey) => {
        const selectedMode = DEVICE_PRESETS[modeKey];
        if (selectedMode) {
            setDeviceMode(selectedMode);
            setGridSettings(prevSettings => ({
                ...prevSettings,
                columns: selectedMode.defaultColumns || prevSettings.columns
            }));
        } else {
            console.warn(`Device mode ${modeKey} not found.`);
        }
    }, []);

    // Function to add a new block to the layout
    const addBlock = useCallback((type, gridColumnStart, gridRowStart) => {
        const newBlock = {
            id: generateUniqueId(),
            type: type,
            gridColumnStart,
            gridRowStart,
            gridColumnSpan: DEFAULT_BLOCK_PROPS[type]?.gridColumnSpan || 1,
            gridRowSpan: DEFAULT_BLOCK_PROPS[type]?.gridRowSpan || 1,
            ...DEFAULT_BLOCK_PROPS[type],
        };
        setLayout(prevLayout => [...prevLayout, newBlock]);
    }, []);

    // Function to update an existing block's properties
    const updateBlock = useCallback((id, newProps) => {
        setLayout(prevLayout =>
            prevLayout.map(block =>
                block.id === id ? { ...block, ...newProps } : block
            )
        );
    }, []);

    // Function to delete a block
    const deleteBlock = useCallback((id) => {
        setLayout(prevLayout => prevLayout.filter(block => block.id !== id));
    }, []);

    // Function to update article metadata
    const updateArticleMetadata = useCallback((field, value) => {
        setArticleMetadata(prevMetadata => ({
            ...prevMetadata,
            [field]: value,
        }));
    }, []);

    // NEW: Function to update view mode, ensuring history is not affected unless it affects layout/content
    const handleSetViewMode = useCallback((mode) => {
        // Only trigger history if this state change *also* causes a layout/content change
        // For simplicity, we'll let the main useEffect capture this if viewMode causes a re-render of something
        // that triggers layout/content changes. Otherwise, we can choose not to save this to history.
        // For now, let's keep it out of the main history dependency if it's purely visual.
        setViewMode(mode);
    }, []);


    const contextValue = {
        gridSettings,
        layout,
        deviceMode,
        viewMode,
        articleMetadata,
        updateGridSetting,
        setDeviceSimulatorMode,
        addBlock,
        updateBlock,
        deleteBlock,
        setViewMode: handleSetViewMode, // NEW: Use the new handler for setViewMode
        updateArticleMetadata,
        undo, // NEW: Expose undo
        redo, // NEW: Expose redo
        canUndo: historyPointer > 0, // NEW: Expose canUndo status
        canRedo: historyPointer < history.length - 1, // NEW: Expose canRedo status
    };

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};