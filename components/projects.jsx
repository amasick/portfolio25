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
        <h3 className="text-white text-2xl font-bold">{tech.name}</h3>
      </div>
      
      <div className="mb-4">
        <h4 className="text-teal-300 font-medium mb-2">Proficiency</h4>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${tech.proficiency}%` }}
          />
        </div>
        <p className="text-gray-300 text-sm mt-1 text-right">
          {tech.level} ({tech.proficiency}%)
        </p>
      </div>
      
      <div className="mb-4">
        <h4 className="text-teal-300 font-medium mb-2">Experience</h4>
        <p className="text-gray-300">{tech.experience}</p>
      </div>
      
      {tech.projects && (
        <div>
          <h4 className="text-teal-300 font-medium mb-2">Related Projects</h4>
          <ul className="list-disc text-gray-300 ml-5">
            {tech.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

const TechStack = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All" },
    { id: "languages", name: "Languages" },
    { id: "frameworks", name: "Frameworks" },
    { id: "databases", name: "Databases" },
    { id: "tools", name: "Tools" },
    { id: "cloud", name: "Cloud" },
  ];
  
  const filteredTechnologies = selectedCategory === "all" 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);
  
  return (
    <section id="tech" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">
          Skills & Tools
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Tech Stack
        </h2>
      </motion.div>
      
      <motion.div 
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="mt-12 max-w-7xl mx-auto"
      >
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-teal-500 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {filteredTechnologies.map((technology, index) => (
              <TechCard
                key={technology.name}
                index={index}
                {...technology}
                isActive={selectedTech?.name === technology.name}
                onClick={() => setSelectedTech(technology)}
              />
            ))}
          </div>
          
          {selectedTech && <TechDetail tech={selectedTech} />}
        </div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(TechStack, "tech");
