import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import TerminalSection from './components/TerminalSection';
import Contact from './components/Contact';
import Experience from './components/Experience';
import { LanguageProvider } from './context/LanguageContext';
import Loader from './components/Loader';

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="bg-background min-h-screen"></div>;

  return (
    <LanguageProvider>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <CustomCursor />
          <Header />
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
          >
            <main className="bg-background min-h-screen text-foreground overflow-x-hidden">
              <Hero />
              
              <About />
              <Services />

              <Projects />
              <Skills />
              <Experience />
              <TerminalSection />
              <Contact />
            </main>
          </motion.div>
        </>
      )}
    </LanguageProvider>
  );
}

export default App;
