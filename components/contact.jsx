// components/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaInstagram, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactCard = ({ icon, title, value, link, index }) => (
  <motion.div
    variants={fadeIn("right", "spring", 0.1 * index, 0.75)}
    className="flex flex-col items-center p-4 rounded-xl bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300 border border-teal-900/20"
  >
    <div className="p-3 rounded-full bg-teal-900/50 mb-3 text-teal-400">
      {icon}
    </div>
    <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-teal-300 text-sm transition-all"
    >
      {value}
    </a>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Replace with your Service ID, Template ID, and Public Key
    emailjs.send(
      'your_service_id',
      'your_template_id',
      {
        from_name: form.name,
        to_name: 'Aman Kaushik',
        from_email: form.email,
        to_email: 'amankaushik0159@gmail.com',
        message: form.message,
        phone: form.phone,
        profession: form.profession,
      },
      'your_public_key'
    )
    .then(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        profession: '',
        message: '',
      });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, (error) => {
      setLoading(false);
      console.error(error);
      alert('Something went wrong. Please try again.');
    });
  };

  const contactLinks = [
    {
      icon: <FaGithub size={24} />,
      title: "GitHub",
      value: "amasick",
      link: "https://github.com/amasick",
    },
    {
      icon: <FaLinkedin size={24} />,
      title: "LinkedIn",
      value: "aman-kaushik",
      link: "https://linkedin.com/in/aman-kaushik",
    },
    {
      icon: <FaEnvelope size={24} />,
      title: "Email",
      value: "amankaushik0159@gmail.com",
      link: "mailto:amankaushik0159@gmail.com",
    },
    {
      icon: <FaFileAlt size={24} />,
      title: "Resume",
      value: "Download CV",
      link: "/resume.pdf",
    },
    {
      icon: <FaInstagram size={24} />,
      title: "Instagram",
      value: "@aman_kaushik",
      link: "https://instagram.com/aman_kaushik",
    },
    {
      icon: <FaTwitter size={24} />,
      title: "Twitter",
      value: "@aman_kaushik",
      link: "https://twitter.com/aman_kaushik",
    },
  ];

  return (
    <section id="contact" className="py-16 relative z-0">
      <motion.div variants={textVariant()}>
        <p className="text-teal-300 sm:text-[18px] text-[14px] uppercase tracking-wider text-center">
          Let's Work Together
        </p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
          Get In Touch
        </h2>
      </motion.div>

      <div className="mt-12 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 0.75)}
            className="md:col-span-1 flex flex-col gap-8"
          >
            <div className="bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-6 rounded-xl backdrop-blur-sm border border-teal-900/20">
              <h3 className="text-white text-xl font-bold mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {contactLinks.slice(0, 4).map((contact, index) => (
                  <ContactCard
                    key={`contact-${index}`}
                    index={index}
                    {...contact}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-6 rounded-xl backdrop-blur-sm border border-teal-900/20">
              <h3 className="text-white text-xl font-bold mb-4">Social Profiles</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {contactLinks.slice(4).map((contact, index) => (
                  <ContactCard
                    key={`social-${index}`}
                    index={index + 4}
                    {...contact}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeIn("left", "spring", 0.2, 0.75)}
            className="md:col-span-2 bg-gradient-to-b from-teal-900/30 to-gray-900/30 p-6 rounded-xl backdrop-blur-sm border border-teal-900/20"
          >
            <h3 className="text-white text-xl font-bold mb-6">Send Me a Message</h3>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-teal-900/50 p-6 rounded-lg text-center"
              >
                <h4 className="text-white text-xl font-bold mb-2">Thank You!</h4>
                <p className="text-gray-300">Your message has been sent successfully. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm mb-2 block">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg outline-none border border-gray-800 focus:border-teal-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg outline-none border border-gray-800 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white text-sm mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg outline-none border border-gray-800 focus:border-teal-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm mb-2 block">Profession</label>
                    <select
                      name="profession"
                      value={form.profession}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg outline-none border border-gray-800 focus:border-teal-500 transition-all"
                    >
                      <option value="">Select your profession</option>
                      <option value="Student">Student</option>
                      <option value="Looking for Service">Looking for Service</option>
                      <option value="Professional">Professional</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-white text-sm mb-2 block">Message</label>
                  <textarea
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    className="w-full bg-gray-900/50 text-white px-4 py-3 rounded-lg outline-none border border-gray-800 focus:border-teal-500 transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-teal-600 hover:to-teal-800 transition-all duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");
