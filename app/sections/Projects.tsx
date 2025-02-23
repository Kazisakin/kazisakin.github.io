'use client';
import React from 'react';
import Card from '../components/Card';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'TaskMaster Pro',
      description: 'A real-time task management app with collaboration features.',
      imageUrl: '/assets/project1.jpg',
      skills: ['React', 'Node.js', 'Socket.io'],
      demoUrl: 'https://taskmasterpro.example.com', // Example URL
      githubUrl: 'https://github.com/kazisakin/taskmasterpro', // Example GitHub
    },
    {
      title: 'SmartVision AI',
      description: 'A computer vision web tool that identifies objects in images.',
      imageUrl: '/assets/project2.jpg',
      skills: ['Python', 'TensorFlow', 'OpenCV'],
      demoUrl: 'https://smartvisionai.example.com',
      githubUrl: 'https://github.com/kazisakin/smartvisionai',
    },
    {
      title: 'DevConnect',
      description: 'A social platform for developers to share code snippets and tips.',
      imageUrl: '/assets/project3.jpg',
      skills: ['Next.js', 'Firebase', 'Tailwind CSS'],
      demoUrl: 'https://devconnect.example.com',
      githubUrl: 'https://github.com/kazisakin/devconnect',
    },
    {
      title: 'E-Shop Demo',
      description: 'A mock e-commerce site with a Node.js backend and React frontend.',
      imageUrl: '/assets/project4.jpg',
      skills: ['React', 'Node.js', 'MongoDB'],
      demoUrl: 'https://eshopdemo.example.com',
      githubUrl: 'https://github.com/kazisakin/eshopdemo',
    },
    {
      title: 'ChatBox Live',
      description: 'A live chat application using WebSockets and a custom UI library.',
      imageUrl: '/assets/project5.jpg',
      skills: ['WebSocket', 'Custom UI', 'JavaScript'],
      demoUrl: 'https://chatboxlive.example.com',
      githubUrl: 'https://github.com/kazisakin/chatboxlive',
    },
  ];

  return (
    <motion.section
      id="projects"
      className="min-h-screen px-4 py-16 bg-gradient-to-br from-[#0a192f] to-[#1a2a44] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extralight text-[#64ffda] mb-12 text-center md:text-left">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              skills={project.skills}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}