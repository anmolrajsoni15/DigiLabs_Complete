import React, { useState, useEffect } from 'react';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };

    darkModeQuery.addEventListener('change', handleThemeChange);

    // Set initial theme based on system preference
    handleThemeChange(darkModeQuery);

    return () => {
      darkModeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return <div className={`theme-${theme}`}>{children}</div>;
};

export default ThemeProvider;