// components/CodingPlatforms.jsx
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { codingPlatforms } from '../constants';
import Chart from 'chart.js/auto';

const PlatformCard = ({ name, icon, description, stats, chartData, index }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      
      if (chartData.type === 'radar') {
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: chartData.labels,
            datasets: [{
              label: chartData.label,
              data: chartData.data,
              backgroundColor: 'rgba(45, 212, 191, 0.2)',
              borderColor: 'rgba(45, 212, 191, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(45, 212, 191, 1)',
              pointHoverBackgroundColor: '#fff',
            }]
          },
          options: {
            responsive: true,
            scales: {
              r: {
                angleLines: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                  backdropColor: 'transparent',
                }
              }
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          }
        });
      } else if (chartData.type === 'line') {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.labels,
            datasets: [{
              label: chartData.label,
              data: chartData.data,
              backgroundColor: 'rgba(45, 212, 191, 0.2)',
              borderColor: 'rgba(45, 212, 191, 1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                }
              },
              y: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.7)',
                }
              }
            },
            plugins: {
              legend: {
                display: false,
              }
            }
          }
        });
      } else if (chartData.type === 'doughnut') {
        chartInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: chartData.labels,
            datasets: [{
              data: chartData.data,
              backgroundColor: [
                'rgba(45, 212, 191, 0.8)',
                'rgba(56, 189, 248, 0.8)',
                'rgba(167, 139, 250, 0.8)',
                'rgba(251, 146, 60, 0.8)',
              ],
              borderColor: 'rgba(17, 24, 39, 1)',
              borderWidth: 2,
            }]
          },
          options: {
            responsive: true,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  color: 'rgba(255, 255, 255, 0.7)',
                  font: {
                    size: 10
                  }
                }
              }
            }
          }
        });
      }
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);
  
  return (
    <motion.div 
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className="bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-6 rounded-xl w-full md:w-[48%] backdrop-blur-sm border border-teal-900/20"
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={icon} alt={name} className="w-12 h-12 object-contain" />
        <h3 className="text-white text-2xl font-bold">{name}</h3>
      </div>
      
      <p className="text-gray-300 mb-6">{description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, statIndex) => (
          <div key={statIndex} className="flex flex-col items-center bg-gray-900/30 p-3 rounded-lg">
            <p className="text-gray-300 text-sm">{stat.label}</p>
            <p className="text-teal-400 text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <canvas ref={chartRef} height={chartData.type === 'doughnut' ? '220' : '180'} />
      </div>
    </motion.div>
  );
};

const CodingPlatforms = () => {
  return (
    <section id="coding" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">
          Competitive Programming
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Coding Platforms
        </h2>
      </motion.div>
      
      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-8 text-gray-300 text-[17px] max-w-3xl leading-[30px] mx-auto text-center"
      >
        <p>
          I regularly participate in competitive programming contests and solve algorithmic problems to sharpen my problem-solving skills.
          Here's a summary of my profiles across different coding platforms.
        </p>
      </motion.div>
      
      <div className="mt-12 flex flex-col md:flex-row flex-wrap justify-center gap-8 max-w-7xl mx-auto px-4">
        {codingPlatforms.map((platform, index) => (
          <PlatformCard
            key={`platform-${index}`}
            index={index}
            {...platform}
          />
        ))}
      </div>
      
      <motion.div 
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-16 max-w-3xl mx-auto px-4"
      >
        <div className="bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-6 rounded-xl backdrop-blur-sm border border-teal-900/20">
          <h3 className="text-white text-xl font-bold mb-4">Overall Statistics</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-300 text-sm">GitHub Repos</p>
              <p className="text-teal-400 text-2xl font-bold">25+</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-300 text-sm">LeetCode Problems</p>
              <p className="text-teal-400 text-2xl font-bold">266</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-300 text-sm">Codeforces Rating</p>
              <p className="text-teal-400 text-2xl font-bold">1128</p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-300 text-sm">Contest Participated</p>
              <p className="text-teal-400 text-2xl font-bold">50+</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default SectionWrapper(CodingPlatforms, "coding");

// components/Skills.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { skills } from '../constants';

const SkillCategory = ({ category, categoryIndex, activeCategoryId, setActiveCategoryId }) => {
  const isActive = activeCategoryId === category.id;
  
  return (
    <motion.div
      variants={fadeIn("right", "spring", categoryIndex * 0.15, 0.75)}
      className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-teal-900/50 border-2 border-teal-500"
          : "bg-gray-900/30 border border-teal-900/20 hover:bg-gray-900/50"
      }`}
      onClick={() => setActiveCategoryId(category.id)}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${isActive ? "bg-teal-500" : "bg-gray-800"}`}>
          {category.icon}
        </div>
        <h3 className="text-white text-xl font-medium">{category.name}</h3>
      </div>
    </motion.div>
  );
};

const SkillBar = ({ name, level, percentage, index }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(percentage);
          }, index * 100);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [percentage, index]);
  
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-gray-400 text-sm">{level}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-teal-500 to-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategoryId, setActiveCategoryId] = useState(skills[0].id);
  
  const activeCategory = skills.find(category => category.id === activeCategoryId);
  
  return (
    <section id="skills" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">
          My Proficiency
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Skills
        </h2>
      </motion.div>
      
      <div className="mt-12 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            {skills.map((category, index) => (
              <SkillCategory
                key={category.id}
                category={category}
                categoryIndex={index}
                activeCategoryId={activeCategoryId}
                setActiveCategoryId={setActiveCategoryId}
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={activeCategoryId}
            className="md:col-span-3 bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-6 rounded-xl backdrop-blur-sm border border-teal-900/20"
          >
            <h3 className="text-white text-2xl font-bold mb-6">{activeCategory.name}</h3>
            
            {activeCategory.description && (
              <p className="text-gray-300 mb-6">{activeCategory.description}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeCategory.items.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  percentage={skill.percentage}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Skills, "skills");
