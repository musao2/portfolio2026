import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Manifesto = () => {
  const { t } = useLanguage();
  const manifesto = t('manifesto');
  
  // Duplicate words to ensure seamless infinite scroll
  const repeatedWords = [...manifesto.words, ...manifesto.words, ...manifesto.words, ...manifesto.words];

  return (
    <section className="py-24 bg-accent relative overflow-hidden flex items-center border-y border-white/20">
      
      {/* Top and Bottom Fade Overlays */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-accent to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-accent to-transparent z-10 pointer-events-none"></div>
      
      {/* Infinite Marquee */}
      <div className="w-full relative flex items-center h-[120px] md:h-[200px] overflow-hidden whitespace-nowrap">
        
        <motion.div
          animate={{ x: [0, -1035] }} // Move left continuously. The value will depend on text width, but flex loop handles it well if calibrated. For a true seamless loop we move exactly 50% of content.
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15
          }}
          className="flex whitespace-nowrap gap-12 px-6"
        >
          {repeatedWords.map((word, idx) => (
            <div key={idx} className="flex items-center gap-12">
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-white/90">
                {word}
              </h2>
              {/* Star / Separator */}
              <div className="w-4 h-4 md:w-8 md:h-8 bg-white rotate-45"></div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default Manifesto;
