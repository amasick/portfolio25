// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navLinks } from '../constants';
import '../styles/Navbar.css';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white text-[24px] font-bold cursor-pointer flex"
          >
            Aman&nbsp;<span className="text-teal-300">Kaushik</span>
          </motion.div>
        </Link>

        <div className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={nav.id}
            >
              <a
                href={`#${nav.id}`}
                className={`${
                  active === nav.title ? "text-teal-300" : "text-white"
                } hover:text-teal-300 text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] cursor-pointer z-20"
            onClick={() => setToggle(!toggle)}
          >
            <div className={`hamburger ${toggle ? 'active' : ''}`}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
          </div>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: toggle ? 0 : "100%" }}
            transition={{ type: "tween" }}
            className={`fixed top-0 right-0 w-3/4 h-screen bg-black/90 backdrop-blur-lg p-8 pt-24 z-10`}
          >
            <ul className="list-none flex justify-start items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-teal-300" : "text-white"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto flex flex-col justify-center items-center" id="home">
      <div className="absolute top-[120px] w-full flex flex-row items-start gap-5 mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-teal-400" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-teal-400 to-transparent" />
        </div>

        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2"
          >
            Hi, I'm <span className="text-teal-400">Aman</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-bold lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]"
          >
            <TypeAnimation
              sequence={[
                'AI/ML Engineer',
                1000,
                'Senior Software Engineer',
                1000,
                'Full Stack Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 mt-4 text-[17px] max-w-3xl"
          >
            IIT Ropar graduate developing cutting-edge AI/ML solutions and scalable software applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8"
          >
            <a
              href="#projects"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center"
            >
              Explore My Work
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"
      >
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-teal-300 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-teal-300"
            />
          </div>
        </a>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-5 w-full flex justify-center"
      >
        <a href="#about" className="text-teal-300 flex flex-col items-center">
          <span className="text-sm mb-1">Scroll to explore</span>
          <MdKeyboardArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
