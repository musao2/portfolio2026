import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const skills = [
  "React", "JavaScript", "TypeScript", "Tailwind CSS", 
  "HTML", "CSS", "Git", "Supabase", "Next.js", "Framer Motion", "Zustand", "Node.js"
];

const Skills = () => {
  const { t } = useLanguage();
  const skillsText = t('skills');

  return (
    <section className="py-24 md:py-48 px-6 overflow-hidden bg-background border-t border-white/5 relative flex flex-col items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none"></div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs md:text-sm text-gray-500 uppercase tracking-widest mb-16 relative z-10"
      >
        [ {skillsText.title} ]
      </motion.p>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12 md:gap-y-8">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              whileHover={{ 
                scale: 1.1, 
                color: '#fff',
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
              }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white/20 cursor-none hover-target transition-colors duration-300 select-none uppercase"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
