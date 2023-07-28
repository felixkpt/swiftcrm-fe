import React, { useEffect, useState } from 'react'

type Props = {}

const Index = (props: Props) => {

    const [activeTheme, setActiveTheme] = useState<string>(''); // Store the active theme in state

    const storedTheme = localStorage.getItem('theme');

    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme: string) => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    };

    const showActiveTheme = (theme: string) => {
        // Handle the active theme in state
        setActiveTheme(theme);
    };

    useEffect(() => {
        setTheme(getPreferredTheme());
        showActiveTheme(getPreferredTheme());
    }, []); // Run this effect only once on mount

    useEffect(() => {
        const handlePreferredThemeChange = () => {
            if (storedTheme !== 'light' && storedTheme !== 'dark') {
                setTheme(getPreferredTheme());
            }
        };

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handlePreferredThemeChange);

        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handlePreferredThemeChange);
        };
    }, [storedTheme]); // Run this effect whenever storedTheme changes

    const handleThemeChange = (theme: string) => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
        showActiveTheme(theme);
    };

    return (
        <div>
            <div>
                <button
                    data-bs-theme-value="light"
                    onClick={() => handleThemeChange('light')}
                    className={activeTheme === 'light' ? 'active' : ''}
                >
                    Light Theme
                </button>
                <button
                    data-bs-theme-value="dark"
                    onClick={() => handleThemeChange('dark')}
                    className={activeTheme === 'dark' ? 'active' : ''}
                >
                    Dark Theme
                </button>
            </div>

        </div>
    )
}

export default Index