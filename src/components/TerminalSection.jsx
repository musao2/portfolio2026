import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const TerminalSection = () => {
  const { t } = useLanguage();
  const term = t('terminal');
  
  const [history, setHistory] = useState([
    { type: 'output', content: term.welcomeMsg }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Update welcome message if language changes
  useEffect(() => {
    setHistory([{ type: 'output', content: term.welcomeMsg }]);
  }, [term.welcomeMsg]);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      const newHistory = [...history, { type: 'input', content: input }];
      
      if (cmd === '') {
        // Do nothing
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (term.responses[cmd]) {
        newHistory.push({ type: 'output', content: term.responses[cmd] });
      } else {
        newHistory.push({ type: 'output', content: term.commandNotFound });
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <section id="terminal" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">{term.title}</h2>
          <p className="hidden md:block text-xs font-mono text-gray-500 uppercase">{term.subtitle}</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[400px] bg-black border border-white/20 rounded-xl overflow-hidden flex flex-col font-mono text-sm md:text-base hover-target cursor-none"
          onClick={focusInput}
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-gray-400 text-xs">guest@muhammadsodiq:~</div>
          </div>

          {/* Terminal Body */}
          <div ref={scrollContainerRef} className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {history.map((entry, i) => (
              <div key={i} className="leading-relaxed whitespace-pre-wrap">
                {entry.type === 'input' ? (
                  <div className="flex items-center text-white">
                    <span className="text-accent mr-2">❯</span>
                    <span>{entry.content}</span>
                  </div>
                ) : (
                  <div className="text-gray-400 ml-4">
                    {entry.content}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex items-center text-white mt-2">
              <span className="text-accent mr-2">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-white caret-white"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TerminalSection;
