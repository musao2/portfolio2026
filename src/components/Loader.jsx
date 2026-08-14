import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const playLightningZap = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Charging Whoosh sound (0 to 1.2s)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(50, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.2);
    gain1.gain.setValueAtTime(0, ctx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.2);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 1.2);

    // Lightning Strike / Zap (at 1.2s)
    setTimeout(() => {
      if (ctx.state === 'suspended') ctx.resume();
      
      const bufferSize = ctx.sampleRate * 2; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.5);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(1, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
      
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(1200, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.4);
      gain2.gain.setValueAtTime(0.6, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.4);
    }, 1200);
  } catch (err) {
    console.log("Audio play blocked or not supported:", err);
  }
};

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
    playLightningZap();
    
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
