import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const about = t('about');

  return (
    <section id="about" className="w-full min-h-screen shrink-0 bg-white text-black relative flex items-center overflow-hidden px-6 md:px-12 lg:px-24 py-24">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none fixed"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center relative z-10">
        
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <div>
            <p className="text-sm font-mono tracking-widest text-gray-400 uppercase">{about.sectionTitle}</p>
          </div>
          
          {/* Enhanced "01" Design */}
          <div className="mt-16 md:mt-32 relative">
            <motion.div 
              initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative w-32 h-32 md:w-48 md:h-48 group cursor-none hover-target"
            >
              <div className="absolute inset-0 bg-black rounded-full mix-blend-multiply opacity-5 group-hover:scale-110 transition-transform duration-700 blur-xl"></div>
              <div className="absolute inset-0 border border-black/10 rounded-full group-hover:rotate-180 transition-transform duration-1000 ease-in-out border-dashed"></div>
              <div className="absolute inset-2 border-2 border-black rounded-full flex items-center justify-center bg-white shadow-2xl overflow-hidden group-hover:border-accent transition-colors duration-500">
                <motion.span 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-6xl md:text-8xl font-black tracking-tighter"
                >
                  01
                </motion.span>
                {/* Glossy reflection */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-full pointer-events-none"></div>
              </div>
            </motion.div>
            <div className="absolute left-16 md:left-24 top-[100%] w-px h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight"
          >
            {about.textPart1} <span className="italic text-gray-500">{about.textPart2}</span> {about.textPart3} <span className="underline decoration-2 underline-offset-8">{about.textPart4}</span> {about.textPart5}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/10 pt-8"
          >
            <div>
              <p className="text-xs text-gray-400 uppercase font-mono mb-2">{about.labels.focus}</p>
              <p className="text-sm font-medium">{about.labels.focusValue}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-mono mb-2">{about.labels.location}</p>
              <p className="text-sm font-medium">{about.labels.locationValue}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-mono mb-2">{about.labels.experience}</p>
              <p className="text-sm font-medium">{about.labels.experienceValue}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-mono mb-2">{about.labels.status}</p>
              <p className="text-sm font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full inline-block"></span>
                {about.labels.statusValue}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
