import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import MusicPlayer from './MusicPlayer';

const Hero = () => {
  const { t } = useLanguage();
  const hero = t('hero');

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-32 pb-24 md:py-0">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 flex items-center space-x-4"
        >
          <span className="h-px w-12 bg-accent block"></span>
          <p className="text-xs tracking-widest text-gray-400 uppercase font-mono">{hero.location}</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.9] uppercase break-words"
        >
          I<span className="text-outline">somov</span><br />
          Muhammad<span className="text-outline">sodiq</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-300 mt-4 md:mt-6 uppercase"
        >
          {hero.role}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 md:mt-24 max-w-xl"
        >
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            {hero.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 right-12 md:right-24 flex items-center space-x-3"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">{hero.available}</span>
        </motion.div>
      </div>

      {/* Abstract visual element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative md:absolute self-center md:self-auto mt-12 md:mt-0 right-0 md:top-1/2 md:-translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] pointer-events-none"
      >
        <div className="w-full h-full border border-white/10 rounded-full absolute top-0 left-0 animate-[spin_20s_linear_infinite] opacity-20" />
        <div className="w-4/5 h-4/5 border border-accent/20 rounded-full absolute top-[10%] left-[10%] animate-[spin_15s_linear_infinite_reverse] opacity-20" />
        <div className="w-3/5 h-3/5 border border-white/5 rounded-full absolute top-[20%] left-[20%] animate-[spin_10s_linear_infinite] opacity-20" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
          <MusicPlayer />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
