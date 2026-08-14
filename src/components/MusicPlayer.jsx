import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Serious classical music (Beethoven - Moonlight Sonata, local file)
    audioRef.current = new Audio('/classical.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Attempt to autoplay on load
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Autoplay prevented by browser:', error);
        setIsPlaying(false); // Browser blocked autoplay, requires user interaction
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play error:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative cursor-none hover-target rounded-full flex items-center justify-center group w-[180px] h-[180px] md:w-[280px] md:h-[280px] transition-transform hover:scale-105"
      onClick={togglePlay}
    >
      <div
        className="w-full h-full rounded-full relative flex items-center justify-center overflow-hidden border-2 border-[#111] animate-[spin_4s_linear_infinite]"
        style={{
          animationPlayState: isPlaying ? 'running' : 'paused',
          background: 'radial-gradient(circle, #1a1a1a 10%, #000 11%, #1a1a1a 20%, #000 21%, #1a1a1a 35%, #000 36%, #1a1a1a 50%, #000 51%, #1a1a1a 65%, #000 66%, #1a1a1a 80%, #000 81%, #1a1a1a 90%, #000 91%, #1a1a1a 100%)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)',
        }}
      >
        {/* Vinyl Reflection / Sheen */}
        <div className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-40" 
             style={{ background: 'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.1) 45deg, transparent 90deg, rgba(255,255,255,0.1) 135deg, transparent 180deg, rgba(255,255,255,0.1) 225deg, transparent 270deg, rgba(255,255,255,0.1) 315deg, transparent 360deg)' }}>
        </div>

        {/* Center label (Red) */}
        <div 
          className="w-1/3 h-1/3 rounded-full flex items-center justify-center relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] z-10 bg-[#e74c3c]"
        >
          {/* Inner hole */}
          <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0a0a0a] rounded-full border border-white/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] z-20"></div>
          
          {/* Text on label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-80">
            <span className="text-[10px] md:text-sm font-serif italic text-black font-semibold mt-[-6px] md:mt-[-10px]">Music</span>
            <span className="text-[4px] md:text-[5px] text-black/70 text-center px-1 md:px-2 mt-1 md:mt-2 uppercase tracking-widest leading-tight">
              Isomov M.<br/>Portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
