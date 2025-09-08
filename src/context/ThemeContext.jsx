import { darkColors, lightColors } from "../constants/colors.js";
import { createContext, useContext, useEffect, useState } from "react"

export const ThemeContext=createContext();

const ThemeContextWrapper=({children})=>{

    const [theme, setTheme]=useState('light');

    useEffect(()=>{
        const getSavedTheme=()=>{      
            const savedTheme= localStorage.getItem('theme');
            if(savedTheme)
            {
                setTheme(savedTheme)
            }
        }
        getSavedTheme();
    },[])

    useEffect(()=>{
        localStorage.setItem('theme',theme)
    },[theme])

    const toggleTheme=()=>{
        setTheme(prevTheme=>(prevTheme==='light') ? 'dark' : 'light');
    }

    const isDarkMode=theme==='dark' ? true :false;
    const colors=isDarkMode ? darkColors : lightColors;

    return <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme, colors}}>{children}</ThemeContext.Provider>
}

export const useTheme=()=>useContext(ThemeContext);

export default ThemeContextWrapper;
