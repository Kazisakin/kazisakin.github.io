'use client';
import React, { useContext } from 'react';
import { SidebarContext } from '../layout';
import { motion } from 'framer-motion';
import { IoMenu } from 'react-icons/io5';

export default function Navbar() {
  const { toggleSidebar } = useContext(SidebarContext);

  // Animation variants
  const logoVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    hover: { scale: 1.05, textShadow: '0 0 10px rgba(100, 255, 218, 0.5)' },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -4, color: '#64ffda', transition: { duration: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, rotate: 90 },
    tap: { scale: 0.9 },
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0a192f]/95 via-[#1a2a44]/95 to-[#0a192f]/95 
      backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border-b border-white/10 py-4 px-6 
      flex items-center justify-between z-50">
      {/* Logo */}
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="relative"
      >
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#64ffda] to-[#4db5ff] 
          bg-clip-text text-transparent tracking-tight">
          KMS
        </h1>
        {/* Glowing underline effect */}
        <motion.span
          className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#64ffda] opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden md:flex items-center space-x-10 text-gray-200 font-medium">
        {['Home', 'About', 'Projects', 'Blog'].map((item, index) => (
          <motion.li
            key={item}
            variants={linkVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <a
              href={`#${item.toLowerCase()}`}
              className="relative px-2 py-1 transition-colors duration-300"
            >
              {item}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#64ffda]"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Hamburger Menu (Mobile) */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={toggleSidebar}
        className="relative p-2 text-gray-200 hover:text-[#64ffda] md:hidden rounded-full 
          bg-[#1a2a44]/50 hover:bg-[#1a2a44]/80 transition-all duration-300"
      >
        <IoMenu size={28} />
        {/* Ripple effect */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#64ffda]/20 scale-0"
          whileHover={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </nav>
  );
}