import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import { FiMonitor, FiPenTool, FiLayers } from 'react-icons/fi';

const iconMap = {
  1: <FiMonitor size={48} strokeWidth={1} />,
  2: <FiPenTool size={48} strokeWidth={1} />,
  3: <FiLayers size={48} strokeWidth={1} />
};

const TiltCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[280px] md:h-[300px] lg:h-[320px] rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 hover-target cursor-none group transition-colors hover:bg-white/10 hover:border-white/20 overflow-hidden"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors duration-500"
      >
        {iconMap[item.id]}
      </div>

      <div 
        style={{ transform: "translateZ(30px)" }}
        className="flex flex-col h-full justify-end relative pointer-events-none pr-4"
      >
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 break-words leading-tight">{item.title}</h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
      </div>
      
      {/* Glow effect */}
      <div 
        style={{ transform: "translateZ(10px)" }}
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      ></div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  const services = t('services');

  return (
    <section id="services" className="w-full min-h-screen shrink-0 bg-background relative flex items-center overflow-hidden px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-24 gap-4 md:gap-8">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
            {services.titleLine1}<br/>
            <span className="text-transparent text-outline">{services.titleLine2}</span>
          </h2>
          <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">{services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {services.items.map((item, index) => (
            <TiltCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
