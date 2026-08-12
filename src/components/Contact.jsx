import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const contact = t('contact');

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background relative flex flex-col items-center justify-center min-h-[80vh] border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs md:text-sm text-gray-400 uppercase tracking-widest mb-12"
        >
          {contact.subtitle}
        </motion.p>

        <motion.a
          href="https://t.me/musa_programmer"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group hover-target flex flex-col items-center cursor-none"
        >
          <h2 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none uppercase group-hover:text-transparent group-hover:text-outline transition-colors duration-500">
            {contact.line1}
          </h2>
          <div className="flex items-center gap-4 mt-4 text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-none uppercase">
            <span className="group-hover:text-transparent group-hover:text-outline transition-colors duration-500 delay-75">{contact.line2}</span>
            <div className="w-12 h-12 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
              <FiArrowRight className="text-white text-2xl md:text-6xl -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </motion.a>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-mono uppercase text-gray-400"
        >
          <p>{contact.footerRights}</p>
          
          <div className="flex gap-8">
            <a href="https://github.com/musao2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover-target cursor-none">GitHub</a>
            <a href="https://t.me/musa_programmer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover-target cursor-none">Telegram</a>
            <a href="https://instagram.com/muhammadsodiq2o" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover-target cursor-none">Instagram</a>
            <a href="mailto:isomovmuhammadsodiq58@gmail.com" className="hover:text-white transition-colors hover-target cursor-none">Email</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
