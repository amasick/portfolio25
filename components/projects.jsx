// components/Projects.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_link }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="p-1 rounded-2xl sm:w-[360px] w-full"
    >
      <Tilt
        options={{
          max: 45,
          scale: 1.05,
          speed: 450,
        }}
        className="bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-5 rounded-2xl w-full h-full backdrop-blur-sm border border-teal-900/20"
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-[230px] cursor-pointer overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex justify-end m-3 gap-2"
          >
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black/80"
            >
              <FaGithub className="w-1/2 h-1/2 text-white" />
            </div>
            
            {demo_link && (
              <div
                onClick={() => window.open(demo_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-teal-900/80"
              >
                <FaExternalLinkAlt className="w-1/3 h-1/3 text-white" />
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-gray-300 text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color} px-2 py-1 rounded-full bg-gray-900/50`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">My work</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px] mx-auto text-center"
        >
          The following projects showcase my skills and experience through real-world examples of my work. 
          Each project is briefly described with links to code repositories and live demos. 
          They reflect my ability to solve complex problems, work with different technologies, 
          and effectively manage projects.
        </motion.p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Projects, "projects");

// components/TechStack.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { technologies } from '../constants';

const TechCard = ({ name, icon, level, index, isActive, onClick }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.1 * index, 0.75)}
      className={`cursor-pointer p-2 rounded-xl flex flex-col items-center justify-center gap-2 w-[100px] h-[100px] transition-all duration-300 ${
        isActive
          ? "bg-teal-900/50 border-2 border-teal-500 scale-110"
          : "bg-gray-900/30 border border-teal-900/20 hover:bg-gray-900/50"
      }`}
      onClick={onClick}
      whileHover={{ scale: isActive ? 1.1 : 1.05 }}
    >
      <img src={icon} alt={name} className="w-12 h-12 object-contain" />
      <p className="text-white text-[12px] text-center font-medium">{name}</p>
    </motion.div>
  );
};

const TechDetail = ({ tech }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 border border-teal-900/40 p-6 rounded-xl max-w-lg w-full backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={tech.icon} alt={tech.name} className="w-12 h-12" />
