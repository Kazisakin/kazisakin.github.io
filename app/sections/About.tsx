'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Download, Code, Coffee, Cpu, Database, PenTool } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null); // Fixed type here

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
                A passionate Computer Science student crafting{" "}
                <span className="text-[#64ffda] font-semibold">interactive, user-centric experiences</span>. I thrive on building seamless digital solutions with{" "}
                <span className="text-[#64ffda] font-semibold">React, Next.js, and Node.js</span>, blending code with creativity.
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
                  { role: "Web & Creative Content Designer @ROBOFLIGHT", time: "Dec 2023 - Sep 2024" },
                  { role: "Webmaster @Bangladesh Student Society, UNB", time: "Sep 2023 - Oct 2024" },
                  { role: "Web Designer @Startup (Freelance)", time: "2023" },
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
                  Bachelor of Computer Science @University of New Brunswick <br />
                  <span className="text-gray-500 text-xs">2023 - 2027</span>
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
                  { icon: <Code />, label: "React", percent: 95 },
                  { icon: <Coffee />, label: "Next.js", percent: 90 },
                  { icon: <Cpu />, label: "Node.js", percent: 92 },
                  { icon: <Database />, label: "MongoDB", percent: 88 },
                  { icon: <PenTool />, label: "Framer", percent: 85 },
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="relative flex flex-col items-center bg-white/10 rounded-lg p-4 w-[100px]"
                    variants={skillVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredSkill(idx)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    {skill.icon}
                    <span className="text-gray-300 text-sm mt-2">{skill.label}</span>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                      <motion.div
                        className="h-full bg-[#64ffda] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percent}%` }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </div>
                    {/* Tooltip */}
                    {hoveredSkill === idx && (
                      <motion.span
                        className="absolute -top-8 bg-[#64ffda] text-[#0a192f] text-xs px-2 py-1 rounded"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill.percent}%
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Counters */}
            <div className="flex flex-col gap-6">
              {[
                { value: "2+", label: "Years of Experience" },
                { value: "15+", label: "Projects Completed" },
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
              href="/assets/resume.pdf"
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