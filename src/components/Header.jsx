import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const nav = t('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Add slight delay for smoothness if needed, but native is usually fine
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none px-6 md:px-12 lg:px-24 ${scrolled ? 'py-3 bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg' : 'py-6 bg-transparent'} text-white`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between py-3 pointer-events-auto">
          
          <div className="flex-1">
            <a href="#" onClick={(e) => scrollToSection(e, 'hero')} className="font-bold text-xl tracking-tighter cursor-none hover-target">
              Mu<span className="text-white">sa.</span>
            </a>
          </div>

          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:opacity-70 transition-opacity hover-target cursor-none">{nav.about}</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:opacity-70 transition-opacity hover-target cursor-none">{nav.projects}</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:opacity-70 transition-opacity hover-target cursor-none">{nav.experience}</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:opacity-70 transition-opacity hover-target cursor-none">{nav.contact}</a>
            <a href="#terminal" onClick={(e) => scrollToSection(e, 'terminal')} className="hover:opacity-70 transition-opacity hover-target cursor-none">{nav.terminal}</a>
          </nav>

          <div className="flex-1 flex justify-end items-center gap-4">
            <a 
              href="https://t.me/musa_programmer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-mono font-medium hover:opacity-70 transition-opacity hover-target cursor-none"
            >
              Telegram
            </a>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 transition-opacity hover:opacity-70 rounded-full px-3 py-1.5 text-xs font-mono font-bold tracking-widest uppercase hover-target cursor-none"
            >
              <span className={language === 'en' ? 'text-white' : 'text-white/50'}>EN</span>
              <span className="w-px h-3 bg-white/50"></span>
              <span className={language === 'uz' ? 'text-white' : 'text-white/50'}>UZ</span>
            </button>
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
