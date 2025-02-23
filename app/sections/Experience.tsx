'use client';
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function Experience() {
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger when 20% of the section is in view
  });

  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) {
      controls.start({ backgroundColor: '#ffd60a' });
    } else {
      controls.start({ backgroundColor: '#ffd60a' });
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      id="experience"
      className="h-[800px] px-4 py-4 text-white transition-colors duration-500"
      animate={controls}
      initial={{ backgroundColor: '#0a192f' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-[#64ffda] mb-8 text-center">
          Experience
        </h2>

        {/* Education Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <GraduationCap className="text-[#64ffda]" /> Education
          </h3>
          <div className="bg-pink-500 bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300">
            <p className="font-bold text-white">
              B.Sc. in Computer Science
            </p>
            <p className="text-gray-100">
              XYZ University (2022 - 2026)
            </p>
            <p className="text-sm text-gray-200">
              Focus on Full-Stack Web Development, Data Structures &amp; Algorithms
            </p>
          </div>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Briefcase className="text-[#64ffda]" /> Work &amp; Internships
          </h3>

          <div className="bg-pink-500 bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 mb-4">
            <p className="font-bold text-white">Front-End Intern</p>
            <p className="text-gray-100">Tech Startup Inc., Summer 2023</p>
            <p className="text-sm text-gray-200">
              Developed responsive UI components, optimized website performance,
              and collaborated on code reviews with senior developers.
            </p>
          </div>

          <div className="bg-pink-500 bg-opacity-80 backdrop-blur-md p-4 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300">
            <p className="font-bold text-white">Freelance Web Developer</p>
            <p className="text-gray-100">Jan 2022 - Present</p>
            <p className="text-sm text-gray-200">
              Building small-scale web applications for local businesses using
              React and Next.js. Focused on modern, maintainable code and best
              practices.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
