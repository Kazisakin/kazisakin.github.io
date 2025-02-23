'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'; // Social icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants for social icons
  const iconVariants = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  return (
    <footer className="bg-gradient-to-t from-[#0a192f] to-[#1a2a44] border-t border-white/10 mt-8 relative overflow-hidden">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-96 h-96 bg-[#64ffda] rounded-full opacity-5 blur-3xl absolute -top-20 left-1/2 transform -translate-x-1/2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 text-center text-gray-300 z-10">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-4">
          {[
            { icon: <Github />, url: 'https://github.com/kazisakin', label: 'GitHub' },
            { icon: <Twitter />, url: 'https://twitter.com/kazisakin', label: 'Twitter' },
            { icon: <Linkedin />, url: 'https://linkedin.com/in/kazisakin', label: 'LinkedIn' },
            { icon: <Mail />, url: 'mailto:kazimostofa.sakin@unb.ca', label: 'Email' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-gray-400 hover:text-[#64ffda] transition-colors duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright & Tech Stack */}
        <motion.p
          className="text-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          © {currentYear} Kazi Sakin          
        </motion.p>
      </div>
    </footer>
  );
}