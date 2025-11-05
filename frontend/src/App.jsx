import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import CodingStats from './components/CodingStats';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    // Update document class and localStorage
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      {/* Loading Screen */}
      <Loader />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <Skills />
        <CodingStats />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
