'use client';
import React, { useContext } from 'react';
import { motion, Variants } from 'framer-motion';
import { SidebarContext } from '../layout';
import { IoClose } from 'react-icons/io5';

// Define the type for SidebarContext
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Define animation variants
const sidebarVariants: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 20,
      duration: 0.5,
    } 
  },
  exit: { 
    x: '-100%', 
    opacity: 0, 
    transition: { duration: 0.4, ease: 'easeInOut' } 
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: i * 0.1, 
      type: 'spring', 
      stiffness: 150,
      damping: 20,
    },
  }),
};

const buttonVariants = {
  hover: { scale: 1.2, rotate: 180 },
  tap: { scale: 0.9 },
};

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useContext(SidebarContext) as SidebarContextType;

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.8 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`fixed inset-0 bg-gradient-to-b from-[#0a192f]/80 to-[#1a2a44]/80 z-40 
          backdrop-blur-sm ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Panel */}
      <motion.aside
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        exit="exit"
        className="fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#0a192f]/95 to-[#1a2a44]/95 
          backdrop-blur-xl shadow-[10px_0_30px_rgba(0,0,0,0.3)] border-r border-white/10 
          z-50 p-8 md:hidden overflow-hidden"
      >
        {/* Subtle Background Effect */}
        <motion.div
          className="absolute inset-0 bg-[#64ffda]/5 opacity-0"
          animate={{ opacity: isOpen ? 0.3 : 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Close Button */}
        <div className="flex justify-end mb-12">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={toggleSidebar}
            className="relative p-2 text-gray-200 hover:text-[#64ffda] rounded-full 
              bg-[#1a2a44]/50 hover:bg-[#1a2a44]/80 transition-all duration-300"
          >
            <IoClose size={28} />
            <motion.span
              className="absolute inset-0 rounded-full bg-[#64ffda]/20 scale-0"
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-10 text-gray-200 font-medium">
          {['Home', 'About', 'Projects', 'Blog'].map((item, i) => (
            <motion.li
              key={item}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate={isOpen ? 'visible' : 'hidden'}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="relative block text-xl tracking-wide hover:text-[#64ffda] 
                  transition-all duration-300 group"
                onClick={toggleSidebar}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#64ffda]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.aside>
    </>
  );
}