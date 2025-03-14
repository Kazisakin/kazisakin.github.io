'use client';
import React from 'react';
import Link from 'next/link';
import Card from '../components/Card';
import { motion } from 'framer-motion';

export default function BlogPreview() {
  const posts = [
    {
      title: 'Understanding React Hooks',
      description: 'understanding-react-hooks',
      imageUrl: '/assets/blog1.jpg',
      slug: 'How  to create a react app in 5 minutes',
      date: 'Feb 10, 2025',
    },
  ];

  return (
    <motion.section
      id="blog"
      className="min-h-screen px-4 py-16 bg-gradient-to-br from-[#0a192f] to-[#1a2a44] text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="w-64 h-64 bg-[#64ffda] rounded-full opacity-10 blur-3xl absolute top-10 left-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="w-96 h-96 bg-[#64ffda] rounded-full opacity-10 blur-3xl absolute bottom-20 right-20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extralight text-[#64ffda] mb-6 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Blog
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Explore my latest insights or{' '}
          <Link
            href="/blog"
            className="text-[#64ffda] hover:underline transition-all duration-300"
          >
            view the full blog
          </Link>
          .
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => ( // Removed 'index' here
            <Card
              key={post.slug}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              slug={post.slug}
              date={post.date}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}