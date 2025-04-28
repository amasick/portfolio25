// components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { FaGraduationCap, FaCode, FaServer, FaRobot } from 'react-icons/fa';

const AboutCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      variants={fadeIn('right', 'spring', 0.1 * index, 0.75)}
      className="bg-gradient-to-r from-teal-900/50 to-gray-900/50 p-6 rounded-2xl w-full sm:w-[300px] backdrop-blur-sm border border-teal-900/20"
    >
      <div className="flex justify-center items-center w-16 h-16 rounded-full bg-teal-400/20 mb-4">
        {icon}
      </div>
      
      <h3 className="text-white text-[20px] font-bold">{title}</h3>
      <p className="text-gray-300 text-[14px] mt-2">{description}</p>
    </motion.div>
  );
};

const cards = [
  {
    icon: <FaGraduationCap size={30} className="text-teal-300" />,
    title: "IIT Graduate",
    description: "B.Tech in Electrical Engineering from IIT Ropar with strong foundations in engineering and computer science."
  },
  {
    icon: <FaCode size={30} className="text-teal-300" />,
    title: "Full Stack Developer",
    description: "Experienced in creating end-to-end applications with modern technologies for optimal performance."
  },
  {
    icon: <FaRobot size={30} className="text-teal-300" />,
    title: "AI/ML Engineer",
    description: "Specialized in building AI-driven solutions that solve complex business problems and deliver value."
  },
  {
    icon: <FaServer size={30} className="text-teal-300" />,
    title: "Backend Expert",
    description: "Proficient in designing robust, scalable backend systems and API architectures."
  },
];

const About = () => {
  return (
    <section id="about" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">Introduction</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">About Me</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-8 text-gray-300 text-[17px] max-w-3xl leading-[30px] mx-auto text-center sm:text-left"
        >
          I'm Aman Kaushik, an IIT Ropar graduate with a B.Tech in Electrical Engineering, specializing in Full Stack Development and AI/ML. With hands-on experience at leading companies like HCLTech and Infinity Learn, I've developed cutting-edge solutions that drive significant impact.
          <br /><br />
          At HCLTech, I architected AI-driven financial analysis pipelines that reduced manual effort by 5 FTEs and slashed turnaround time by 90%. At Infinity Learn, I created a lead-to-sale prediction model and custom dashboards, optimizing workflows by 90%. At KOSH, I enhanced medical note understanding using advanced AI models, reducing clinical coding time from hours to minutes.
          <br /><br />
          My technical skills span C++, Python, Java, SQL, TensorFlow, PyTorch, AWS, and multi-agent systems. Whether it's building robust back-end systems, automating processes, or developing AI-driven applications, I'm passionate about delivering high-quality, scalable solutions.
        </motion.p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <AboutCard key={`card-${index}`} index={index} {...card} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");

// components/Experience.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { SectionWrapper } from '../hoc';
import { experiences } from '../constants';
import { textVariant } from '../utils/motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgba(10, 25, 47, 0.8)',
        color: '#fff',
        borderRadius: '15px',
        border: '1px solid rgba(45, 212, 191, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(5px)',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(45, 212, 191, 0.5)' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-teal-300 text-[16px] font-semibold'>
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-gray-300 text-[14px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>

      {experience.technologies && (
        <div className="mt-4">
          <p className="text-teal-300 text-[14px] font-semibold">Technologies:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.technologies.map((tech, index) => (
              <span
                key={`tech-${index}`}
                className="text-xs bg-teal-900/50 text-teal-200 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  const handleNext = () => {
    if (currentExperienceIndex < experiences.length - 1) {
      setCurrentExperienceIndex(currentExperienceIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentExperienceIndex > 0) {
      setCurrentExperienceIndex(currentExperienceIndex - 1);
    }
  };
  
  return (
    <section id="experience" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">
          My Professional Journey
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Experience
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center gap-4"
        >
          <button
            onClick={() => setShowAllExperiences(!showAllExperiences)}
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition duration-300 flex items-center gap-2"
          >
            {showAllExperiences ? "Carousel View" : "Show All Experiences"}
          </button>
        </motion.div>

        {showAllExperiences ? (
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
              />
            ))}
          </VerticalTimeline>
        ) : (
          <div className="relative px-4">
            <div className="max-w-4xl mx-auto">
              <ExperienceCard experience={experiences[currentExperienceIndex]} />
            </div>
            
            <div className="flex justify-center mt-8 gap-8">
              <button
                onClick={handlePrevious}
                disabled={currentExperienceIndex === 0}
                className={`p-3 rounded-full ${
                  currentExperienceIndex === 0 
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed" 
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                } transition duration-300`}
              >
                <FaArrowLeft />
              </button>
              
              <div className="flex items-center gap-2">
                {experiences.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => setCurrentExperienceIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentExperienceIndex === index
                        ? "bg-teal-400"
                        : "bg-gray-500"
                    } transition-all duration-300`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                disabled={currentExperienceIndex === experiences.length - 1}
                className={`p-3 rounded-full ${
                  currentExperienceIndex === experiences.length - 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600 text-white"
                } transition duration-300`}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "experience");
