import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const getExitAnimation = (index) => {
  // 4 directions: top-left, top-right, bottom-left, bottom-right
  const dirs = [
    { x: -1000, y: -1000, rotate: -360 }, // M
    { x: 1000, y: -1000, rotate: 360 },  // U
    { x: -1000, y: 1000, rotate: -360 }, // S
    { x: 1000, y: 1000, rotate: 360 }    // A
  ];
  return dirs[index];
};

const Loader = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {

    
    // Trigger the exit animation at 4 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4000);

    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ delay: isExiting ? 0.6 : 0, duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => { if(isExiting) onLoadingComplete(); }}
    >
      <motion.div
        className="absolute z-20 w-8 h-8 bg-white rounded-full"
        style={{ boxShadow: '0 0 50px 20px rgba(255,255,255,0.8)' }}
        initial={{ scale: 0, rotate: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5, 0.5, 5], rotate: 1440, opacity: [1, 1, 1, 0] }}
        transition={{ duration: 1.2, ease: "easeIn" }}
      >
        <div className="w-full h-full border-4 border-primary rounded-full animate-ping" />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-white z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 0.5, 0] }}
        transition={{ delay: 1.2, duration: 0.6, times: [0, 0.1, 0.3, 0.5, 1] }}
      />

      <motion.div 
        className="flex items-center justify-center mb-10 relative z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isExiting ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring", bounce: 0.6 }}
      >
        {["M", "U", "S", "A"].map((letter, index) => (
          <motion.span
            key={index}
            className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-primary mx-1 md:mx-3 inline-block"
            style={{ textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px var(--primary)' }}
            initial={{ opacity: 0, y: 50, x: 0, rotate: 0, scale: 1 }}
            animate={isExiting ? {
              opacity: 0,
              x: getExitAnimation(index).x,
              y: getExitAnimation(index).y,
              rotate: getExitAnimation(index).rotate,
              scale: 0.5
            } : {
              opacity: 1, y: 0, x: 0, rotate: 0, scale: 1
            }}
            transition={isExiting ? {
              duration: 0.8,
              ease: "easeInOut"
            } : {
              duration: 0.5,
              delay: 1.2 + (index * 0.1),
              type: "spring",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      
      <motion.div
        className="w-80 h-1.5 bg-white/20 rounded-full overflow-hidden mt-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={isExiting ? { duration: 0.5 } : { delay: 2.2, duration: 0.5 }}
      >
        <motion.div
          className="h-full bg-white shadow-[0_0_10px_#fff]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;
