import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const { t } = useLanguage();
  const experienceData = t('experience');

  return (
    <section id="experience" className="min-h-screen bg-white text-black relative flex items-center overflow-hidden px-6 md:px-12 lg:px-24 py-24">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center">
        
        {/* Left side: Stationary */}
        <div className="w-full md:w-1/3 z-10">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none"
            >
              {experienceData.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-gray-500 font-mono text-sm uppercase max-w-xs"
            >
              {experienceData.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Right side: Internally scrollable */}
        <div className="w-full md:w-2/3 relative h-[60vh] md:h-[80vh]">
          {/* Top and bottom fade masks */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>

          {/* Scrollable container */}
          <div className="h-full overflow-y-auto pb-24 pt-24 pr-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="relative flex flex-col gap-24">
              {/* Vertical line spanning the scrollable content */}
              <div className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-px bg-black/20"></div>

              {experienceData.items.map((item, idx) => (
                <motion.div 
                  key={item.year} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12 md:pl-20"
                >
                  {/* Indicator Dot */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 md:w-6 md:h-6 bg-white border border-black rounded-full z-10 flex items-center justify-center transition-transform hover:scale-125 cursor-none hover-target">
                    <div className="w-1 h-1 md:w-2 md:h-2 bg-black rounded-full"></div>
                  </div>
                  
                  <div>
                    <p className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-3">{item.year}</p>
                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">{item.title}</h3>
                    <p className="text-gray-600 md:text-lg max-w-md">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}} />
        </div>

      </div>
    </section>
  );
};

export default Experience;
