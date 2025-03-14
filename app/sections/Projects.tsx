'use client';
import React from 'react';
import Card from '../components/Card';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'Roboflight.ca Platform',
      description:
        'Full-stack application serving 200+ K–12 students in robotics, featuring a responsive Next.js + TypeScript frontend, a secure Python REST API backend, and AWS deployment—all with zero reported vulnerabilities.',
      imageUrl: '/assets/Roboflight_profile.png',
      skills: ['Next.js', 'TypeScript', 'Python'],
      demoUrl: 'https://roboflight.ca/',
      githubUrl: '#', 
    },
    {
      title: 'SMS Spam Classifier',
      description:
        'Processed 11,000+ messages for spam detection with Logistic Regression, achieving 95% accuracy. Demonstrated an end-to-end ML pipeline from data wrangling to deployment.',
      imageUrl: '/assets/spam-classifier.png',
      skills: ['Python', 'Pandas', 'Scikit-learn'],
      demoUrl: 'https://sms-spam-classifier-production.up.railway.app/', 
      githubUrl: 'https://github.com/Kazisakin/SMS-Spam-Classifier',
    },
    {
      title: 'Secure Voting Platform',
      description:
        'Online voting system for 100+ users with MFA, minimizing unauthorized access attempts and reducing election errors by 80%. Streamlined multiple club elections with efficient vote counting.',
      imageUrl: '/assets/voting-platform.jpg',
      skills: ['WordPress', 'PHP', 'MySQL'],
      demoUrl: '#', 
      githubUrl: 'https://github.com/Kazisakin/2FA-Universal-WP-Voting',
    },
    
    {
      title: 'Travel Suggestion Web app',
      description:
        'Location-based recommendation system covering 50+ destinations and analyzing 5,000+ data points. Integrated real-time flight/hotel deal APIs, ensuring 99% uptime and boosting site traffic by 25%.',
      imageUrl: '/assets/travel-suggestion.jpg', 
      skills: ['Next.js', 'Tailwind CSS', 'Public APIs'],
      demoUrl: '#', 
      githubUrl: 'https://github.com/yourusername/travel-suggestion', 
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
          Major Projects
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
