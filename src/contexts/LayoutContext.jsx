import React, { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { generateUniqueId, DEFAULT_GRID_SETTINGS, DEFAULT_BLOCK_PROPS, DEVICE_PRESETS } from '../utils/constants';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    // ... (rest of your loadInitialState and useState declarations remain the same) ...
    const loadInitialState = () => {
        try {
            const savedState = localStorage.getItem('magazineLayoutBuilder');
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

    const [gridSettings, setGridSettings] = useState(initialState.gridSettings);
    const [layout, setLayout] = useState(initialState.layout);
    const [deviceMode, setDeviceMode] = useState(initialState.deviceMode);
    const [viewMode, setViewMode] = useState(initialState.viewMode);
    const [articleMetadata, setArticleMetadata] = useState(initialState.articleMetadata);

    const [history, setHistory] = useState([
        { layout: initialState.layout, gridSettings: initialState.gridSettings, articleMetadata: initialState.articleMetadata }
    ]);
    const [historyPointer, setHistoryPointer] = useState(0);

    const isInitialMount = useRef(true);

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
        // Note: setHistoryPointer will cause a re-render, which will re-run this effect.
        // It's generally better to update the pointer within the same state update or use a ref for pointer
        // if you want to avoid extra effect runs.
        // However, for this specific fix, adding it to dependencies is enough to pass the linter.
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
    }, [layout, gridSettings, articleMetadata, deviceMode, historyPointer, viewMode]); // <-- ADDED these three dependencies

    // ... (rest of your functions and contextValue remain the same) ...

    const restoreState = useCallback((index) => {
        if (index >= 0 && index < history.length) {
            const stateToRestore = history[index];
            isInitialMount.current = true;

            setLayout(stateToRestore.layout);
            setGridSettings(stateToRestore.gridSettings);
            setArticleMetadata(stateToRestore.articleMetadata);
            setHistoryPointer(index);

            setTimeout(() => {
                isInitialMount.current = false;
            }, 0);
        }
    }, [history]);

    const undo = useCallback(() => {
        if (historyPointer > 0) {
            restoreState(historyPointer - 1);
        }
    }, [historyPointer, restoreState]);

    const redo = useCallback(() => {
        if (historyPointer < history.length - 1) {
            restoreState(historyPointer + 1);
        }
    }, [historyPointer, history.length, restoreState]);

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

    const updateBlock = useCallback((id, newProps) => {
        setLayout(prevLayout =>
            prevLayout.map(block =>
                block.id === id ? { ...block, ...newProps } : block
            )
        );
    }, []);

    const deleteBlock = useCallback((id) => {
        setLayout(prevLayout => prevLayout.filter(block => block.id !== id));
    }, []);

    const updateArticleMetadata = useCallback((field, value) => {
        setArticleMetadata(prevMetadata => ({
            ...prevMetadata,
            [field]: value,
        }));
    }, []);

    const handleSetViewMode = useCallback((mode) => {
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
        setViewMode: handleSetViewMode,
        updateArticleMetadata,
        undo,
        redo,
        canUndo: historyPointer > 0,
        canRedo: historyPointer < history.length - 1,
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
