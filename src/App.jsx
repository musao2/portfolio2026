import React, { useEffect, useState } from 'react';
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

function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="bg-background min-h-screen"></div>;

  return (
    <LanguageProvider>
      <CustomCursor />
      <Header />
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
    </LanguageProvider>
  );
}

export default App;
