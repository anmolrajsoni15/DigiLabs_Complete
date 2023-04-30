import './App.css';
import React, { useEffect } from 'react';
import Account from './Components/Onboarding/Account/Account';
import ThemeProvider from './ThemeProvider';

function App() {
  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add(prefersDarkMode ? 'theme-dark' : 'theme-light');
  }, []);

  return (
    <ThemeProvider>
      <Account/>
    </ThemeProvider>
  );
}


export default App;
