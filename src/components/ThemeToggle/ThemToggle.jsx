import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);


    const applyTheme = (theme) => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
        setIsDarkMode(theme === "dark");
    }

    useEffect(()=> {
        const storedTheme = localStorage.getItem("theme");
        applyTheme(storedTheme === "dark" ? "dark" : "light")
    }, [])


    const toggleTheme = () => {
        if (isDarkMode === false) {
            applyTheme("dark");
        } else {
            applyTheme("light");
        }
    }

  return (
    <button
      onClick={() => toggleTheme()}
      className="cursor-pointer  p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-transform"
      aria-label="Toggle Dark Mode"
    >
      {!isDarkMode ? (
        <MoonIcon size={20} className="text-blue-800" />
      ) : (
        <SunIcon size={20} className="text-main" />
      )}
    </button>
  );
}
