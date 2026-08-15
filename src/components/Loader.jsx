import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const fullText = "MUSA";

  useEffect(() => {
    let currentText = '';
    let i = 0;
    
    // Type characters one by one like a human
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setDisplayText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
        
        // After finishing typing, wait a bit then trigger exit
        setTimeout(() => {
          setIsExiting(true);
        }, 600); // 0.6s wait after typing is done
      }
    }, 250); // 0.25s per character

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => { if(isExiting) onLoadingComplete(); }}
    >
      <div className="flex flex-col items-center w-full max-w-2xl px-4">
        {/* Typing Text Container */}
        <div className="flex items-center justify-center h-32 md:h-48 mb-6">
          <span
            className="text-8xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-primary"
            style={{ textShadow: '0 0 40px rgba(255,255,255,0.8), 0 0 80px var(--primary)' }}
          >
            {displayText}
          </span>
          
          {/* Blinking Cursor */}
          <motion.span
            className="text-8xl md:text-[12rem] font-light text-white ml-2 md:ml-4 -mt-2 md:-mt-6"
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0 } : { opacity: [1, 0, 1] }}
            transition={isExiting ? { duration: 0.2 } : {
              repeat: Infinity,
              duration: 0.7,
              ease: "linear"
            }}
          >
            |
          </motion.span>
        </div>
        
        {/* Loading Progress Bar */}
        <motion.div
          className="w-64 md:w-96 h-1.5 bg-white/20 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-white shadow-[0_0_10px_#fff]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
