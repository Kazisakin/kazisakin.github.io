'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Download, Code, Cpu, Database, PenTool,CheckCircle, Box,GitBranch } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const skillVariants = {
    hover: { scale: 1.1, y: -5, transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0px 4px 15px rgba(100, 255, 218, 0.3)' },
    tap: { scale: 0.95 },
  };

  return (
    <motion.section
      id="about"
      className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0a192f] to-[#1a2a44] text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-72 h-72 bg-[#64ffda] rounded-full opacity-10 blur-3xl absolute top-20 left-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="w-96 h-96 bg-[#64ffda] rounded-full opacity-10 blur-3xl absolute bottom-10 right-10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <div className="w-full max-w-6xl z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extralight mb-8 text-left text-[#e5e5e5]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 gap-8">
          {/* 1st Row - Profile Picture and Text */}
          <div className="grid grid-cols-1 md:grid-cols-[180px_auto] gap-8">
            {/* Profile Picture */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex justify-center items-center relative overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-[140px] h-[140px] rounded-full overflow-hidden border-2 border-[#64ffda] shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/assets/profile-image.jpg"
                  alt="Profile"
                  width={140}
                  height={140}
                  className="w-full h-full object-cover filter grayscale hover:filter-none transition duration-500"
                />
              </motion.div>
              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-[#64ffda]/20 to-transparent opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Text Box */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#e5e5e5] mb-4">
                Hi 👋 I’m Kazi Sakin
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                A passionate Computer Science student skilled in{" "}
                <span className="text-[#64ffda] font-semibold">Java, C, and C++</span>, crafting{" "}
                <span className="text-[#64ffda] font-semibold">innovative digital experiences</span>. 
                I specialize in building seamless solutions with{" "}
                <span className="text-[#64ffda] font-semibold">React, Next.js, and Node.js</span>, 
                bringing ideas to life with intuitive{" "}
                <span className="text-[#64ffda] font-semibold">UI/UX design</span> powered by{" "}
                <span className="text-[#64ffda] font-semibold">Docker, GitHub</span>, and agile methodologies.
              </p>

            </motion.div>
          </div>

          {/* 2nd Row - Experience and Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="text-[#64ffda]" /> Experience
              </h4>
              <ul className="space-y-3 text-left">
                {[
                  { role: "Web Developer Intern, ROBOFLIGHT", time: "Dec 2023 - Dec 2024" },
                  { role: "Webmaster, Bangladesh Student Society, UNB", time: "Sep 2023 - Oct 2024" },
                  { role: "Full Stack Web Developer, (Freelance)", time: "2020 - Present" },
                ].map((exp, idx) => (
                  <motion.li
                    key={idx}
                    className="text-gray-300 text-sm"
                    whileHover={{ x: 5, color: "#64ffda" }}
                    transition={{ duration: 0.2 }}
                  >
                    {exp.role} <br />
                    <span className="text-gray-500 text-xs">{exp.time}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

                      <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="text-[#64ffda]" /> Education
            </h4>
            <ul className="space-y-3 text-left">
              <motion.li
                className="text-gray-300 text-sm"
                whileHover={{ x: 5, color: "#64ffda" }}
                transition={{ duration: 0.2 }}
              >
                Bachelor of Computer Science, University of New Brunswick <br />
                <span className="text-gray-500 text-xs">2023 – 2027</span>
              </motion.li>
              <motion.li
                className="text-gray-300 text-sm"
                whileHover={{ x: 5, color: "#64ffda" }}
                transition={{ duration: 0.2 }}
              >
                Bachelor of Information and Communication Technology, Bangladesh University of Professionals <br />
                <span className="text-gray-500 text-xs">June 2022 – October 2022</span>
              </motion.li>
              <motion.li
                className="text-gray-300 text-sm"
                whileHover={{ x: 5, color: "#64ffda" }}
                transition={{ duration: 0.2 }}
              >
                Higher Secondary Certificate, Adamjee Cantonment Public College <br />
                <span className="text-gray-500 text-xs">July 2020 – December 2021</span>
              </motion.li>
            </ul>
          </motion.div>
          </div>

          {/* 3rd Row - Skills and Counters */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            {/* Skills */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-[#c1c1c1]">Skills</h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  // Programming Languages
                  { icon: <Code size={16} />, label: "JavaScript" },
                  { icon: <Code size={16} />, label: "Python" },
                  { icon: <Code size={16} />, label: "Java" },
                  { icon: <Code size={16} />, label: "C++" }, 
                  { icon: <Code size={16} />, label: "SQL" },       
                  { icon: <Database size={16} />, label: "PostgreSQL" },
                  { icon: <Database size={16} />, label: "Firebase" },
                  { icon: <Cpu size={16} />, label: "AWS" }, 
                  { icon: <Box size={16} />, label: "Docker" }, 
                  { icon: <GitBranch size={16} />, label: "GitHub" },
                  { icon: <Cpu size={16} />, label: "Pandas" },
                  { icon: <Cpu size={16} />, label: "NumPy" },
                  { icon: <Cpu size={16} />, label: "Scikit-l" },
                  { icon: <CheckCircle size={16} />, label: "Agile/Scrum" },
                  { icon: <PenTool size={16} />, label: "UI/UX" },
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="relative flex flex-col items-center bg-white/10 rounded-lg p-4 w-[100px]"
                    variants={skillVariants}
                    whileHover="hover"
                  >
                    {skill.icon}
                    <span className="text-gray-300 text-sm mt-2">{skill.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Counters */}
            <div className="flex flex-col gap-6">
              {[
                { value: "3+", label: "Years of Experience" },
                { value: "8+", label: "Projects Completed" },
              ].map((counter, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  transition={{ duration: 0.8, delay: 1 + idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-3xl font-bold text-[#64ffda]">{counter.value}</h4>
                  <p className="text-gray-400 text-sm">{counter.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Download Resume Button */}
          <motion.div
            className="self-start mt-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/assets/Resume.pdf"
              download
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#64ffda] text-[#0a192f] rounded-full font-semibold shadow-lg transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}