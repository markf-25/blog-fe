import {createContext, useEffect, useState} from "react";

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || 'light');

    useEffect(() => {
        document.querySelector('[data-theme]').setAttribute('data-theme', theme);
        localStorage.setItem("theme", theme);
    }, [theme])

    const switchTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return <ThemeContext.Provider value={{theme, switchTheme}}>
        {children}
    </ThemeContext.Provider>
}

export const ThemeContext = createContext({});