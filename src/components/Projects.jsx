import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const projectsData = t('projects');
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section id="projects" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-background relative border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-24">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">{projectsData.titleLine1}<br/>{projectsData.titleLine2}</h2>
          <p className="hidden md:block text-sm font-mono text-gray-400 uppercase">{projectsData.subtitle}</p>
        </div>

        <div className="space-y-0">
          {projectsData.items.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative block border-t border-white/10 py-12 md:py-16 hover-target cursor-none"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10 mix-blend-difference">
                <div className="w-full md:w-1/2">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:pl-6 transition-all duration-500">{project.title}</h3>
                  <p className="mt-4 text-gray-400 group-hover:pl-6 transition-all duration-500 delay-75">{project.description}</p>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-row items-center justify-between md:justify-end gap-8 md:gap-16 font-mono text-sm uppercase">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs">{projectsData.labels.tech}</span>
                    <span>{project.tech}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs">{projectsData.labels.year}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://github.com/musao2" target="_blank" rel="noopener noreferrer" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
                      <FiGithub size={20} />
                    </a>
                    <a href={project.link || "#"} target={project.link ? "_blank" : undefined} rel={project.link ? "noopener noreferrer" : undefined} className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors bg-white text-black">
                      <FiArrowUpRight size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Image Reveal Effect (Abstract box for now) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredProject === project.id ? '100%' : '0%',
                  opacity: hoveredProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full bg-accent/20 z-0 flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/40 via-background/0 to-background/0" />
              </motion.div>
            </motion.div>
          ))}
          <div className="border-t border-white/10"></div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
