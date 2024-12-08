import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 cursor-pointer rounded-full p-1
      ${isDarkMode ? "bg-gray-800" : "bg-gray-300"}
      transition-all duration-300`}
    >
      <div
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
        ${isDarkMode ? "translate-x-6" : "translate-x-0"}`}
      ></div>
      <div
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-600 dark:text-gray-400 ${
          isDarkMode ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        ☀️
      </div>
      <div
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 ${
          isDarkMode ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        🌙
      </div>
    </div>
  );
};

export default ThemeToggle;
