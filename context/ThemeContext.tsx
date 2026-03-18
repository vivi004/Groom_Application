import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Storage } from '../utils/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    colorScheme: Theme;
    toggleColorScheme: () => void;
    isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load persisted theme
        const loadTheme = async () => {
            try {
                const savedTheme = await Storage.getItem('theme');
                if (savedTheme) {
                    setColorScheme(savedTheme as Theme);
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            } finally {
                setIsLoaded(true);
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        // Persist theme changes
        if (isLoaded) {
            Storage.setItem('theme', colorScheme || 'light');
        }
    }, [colorScheme, isLoaded]);

    const value = React.useMemo(() => ({
        colorScheme: (colorScheme as Theme) || 'light',
        toggleColorScheme,
        isDarkMode: colorScheme === 'dark',
    }), [colorScheme, toggleColorScheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
