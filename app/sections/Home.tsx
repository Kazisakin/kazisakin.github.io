'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { IoMailOutline } from 'react-icons/io5';
import Image from 'next/image'; // Added import

export default function Home() {
  const [email, setEmail] = useState('');

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeInOut' } },
    tap: { scale: 0.95 },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a192f] to-[#1a2a44] relative overflow-hidden"
    >
      {/* Background Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-64 h-64 bg-[#64ffda] rounded-full opacity-10 blur-3xl absolute top-10 left-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="w-96 h-96 bg-[#64ffda] rounded-full opacity-10 blur-3xl absolute bottom-20 right-20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-16 text-white">
        {/* Left Content */}
        <div className="max-w-2xl space-y-6 text-center md:text-left">
          <motion.p
            className="text-gray-400 flex items-center justify-center md:justify-start space-x-2 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span>✨</span>
            <span>Computer Science Student</span>
          </motion.p>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            I am Kazi Sakin <br />
            <span className="text-[#64ffda]">
              <Typewriter
                words={['FullStack Developer', 'Problem Solver', 'Tech Enthusiast']}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-md md:text-lg text-gray-300 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            I specialize in crafting unique digital experiences with stunning designs, driven by core values, open communication, and a deep understanding of user needs.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          >
            <motion.a
              href="#portfolio"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-6 py-3 bg-[#64ffda] text-[#0a192f] text-sm rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Projects
            </motion.a>
            <motion.a
              href="mailto:kazimostofa.sakin@unb.ca"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex items-center space-x-2 px-6 py-3 border border-[#64ffda] text-[#64ffda] rounded-full hover:bg-[#64ffda] hover:text-[#0a192f] transition-all duration-300"
            >
              <IoMailOutline size={20} /> <span>Contact Me</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="mt-6"
          >
            <p className="text-gray-400 mb-2">Get updates on my latest projects!</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 rounded-full bg-[#1a2a44] text-white border border-gray-700 focus:outline-none focus:border-[#64ffda] transition"
              />
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-full font-semibold"
                onClick={() => alert(`Thanks for subscribing, ${email}!`)}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Image with Floating Effect */}
        <motion.div
          className="relative mt-10 md:mt-0 w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl"
          variants={imageVariants}
          initial="initial"
          animate="animate"
        >
          <Image
            src="/assets/profile-image.jpg"
            alt="Kazi Sakin"
            width={400} // Matches largest size (lg:w-[400px])
            height={400} // Matches largest size (lg:h-[400px])
            className="w-full h-full object-cover rounded-3xl filter grayscale hover:filter-none transition duration-500"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/50 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </section>
    </motion.section>
  );
}