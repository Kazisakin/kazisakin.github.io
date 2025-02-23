'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
import Image from 'next/image'; // Added import
import { ExternalLink, Github } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  slug?: string;
  skills?: string[];
  demoUrl?: string;
  githubUrl?: string;
  date?: string;
}

export default function Card({
  title,
  description,
  imageUrl,
  slug,
  skills = [],
  demoUrl,
  githubUrl,
  date,
}: CardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  };

  const isBlogPost = !!slug;

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.2}>
      <motion.div
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={400} // Adjust based on your design
            height={192} // Matches h-48 (48 * 4 = 192px)
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {isBlogPost ? (
            <motion.p
              className="text-xs text-gray-500 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {date}
            </motion.p>
          ) : (
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="text-xs font-semibold bg-[#64ffda] text-[#0a192f] rounded-full px-3 py-1 shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          )}

          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          <div className="flex gap-4">
            {isBlogPost ? (
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href={`/blog/${slug}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-full font-semibold text-sm shadow-md"
                >
                  <ExternalLink size={16} />
                  Read More
                </Link>
              </motion.div>
            ) : (
              <>
                {demoUrl && (
                  <motion.a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center gap-2 px-4 py-2 bg-[#64ffda] text-[#0a192f] rounded-full font-semibold text-sm shadow-md"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </motion.a>
                )}
                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex items-center gap-2 px-4 py-2 border border-[#64ffda] text-[#64ffda] rounded-full font-semibold text-sm shadow-md hover:bg-[#64ffda] hover:text-[#0a192f] transition-colors"
                  >
                    <Github size={16} />
                    GitHub
                  </motion.a>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
}