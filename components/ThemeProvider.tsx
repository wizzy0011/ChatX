"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("chatx-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = savedTheme ? JSON.parse(savedTheme) : prefersDark;
    
    setIsDarkMode(dark);
    applyTheme(dark);
    setMounted(true);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("light");
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  };

  const toggleTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("chatx-theme", JSON.stringify(isDark));
    applyTheme(isDark);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
