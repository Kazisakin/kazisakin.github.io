// ============================================
// DATA LAYER (Model in MVC Pattern)
// ============================================
// This file contains all the portfolio data
// Separating data from UI makes code easier to maintain and understand

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Languages';
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  coursework: string[];
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string[];
}

// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: 'Kazi Mostofa Sakin',
  title: 'Computer Science Student',
  subtitle: '4th Year CS @ University of New Brunswick',
  email: 'kazimostofa.sakin@unb.ca',
  github: 'https://github.com/Kazisakin',
  linkedin: 'https://linkedin.com/in/kazisakin',
  behance: 'https://www.behance.net/kazimostofasakin',
  resumeUrl: '/assets/Resume.pdf',
};

// ============================================
// INTRODUCTION
// ============================================
export const introduction = {
  greeting: 'Hi, I\'m Kazi Sakin',
  description: 'I\'m a 4th-year Computer Science student at the University of New Brunswick with a passion for building secure, scalable applications. My interests span full-stack development, automation, and machine learning. I enjoy solving complex problems through clean code and thoughtful system design.',
};

// ============================================
// PROJECTS DATA
// ============================================
export const projects: Project[] = [
  {
    id: 1,
    title: 'Wildfire Detection System',
    description: 'Built an interactive weather visualization dashboard with JavaFX, displaying real-time metrics across a 16×16 grid. Engineered buffered data loader with linear filtering and implemented 24-hour forecast slider to enable data-driven evacuation planning.',
    technologies: ['Java', 'JavaFX', 'JUnit', 'Data Structures'],
    githubUrl: 'https://github.com/Kazisakin',
    imageUrl: '/assets/wildfire-project.png',
  },
  {
    id: 2,
    title: 'SMS Spam Classifier',
    description: 'Developed ML-powered spam detection trained on 11,000+ messages with custom regex preprocessing pipeline. Achieved 94% F1-score and deployed as containerized Flask app with live predictions on Render.com.',
    technologies: ['Python', 'Pandas', 'Docker', 'Flask'],
    githubUrl: 'https://github.com/Kazisakin/SMS-Spam-Classifier',
    liveUrl: 'https://sms-spam-classifier-production.up.railway.app/',
    imageUrl: '/assets/spam-classifier.png',
  },
  {
    id: 3,
    title: 'Case Management System',
    description: 'Created intelligent support platform leveraging OpenAI API for auto-categorization of customer issues. Designed real-time analytics dashboard with PostgreSQL backend, tracking case resolution across 5 priority categories.',
    technologies: ['Next.js', 'OpenAI API', 'PostgreSQL', 'REST API'],
    githubUrl: 'https://github.com/Kazisakin',
    liveUrl: '#',
    imageUrl: '/assets/case-management.png',
  },
  {
    id: 4,
    title: 'Secure Voting Platform',
    description: 'Architected custom WordPress voting system with two-factor authentication serving 100+ active voters. Implemented time-limited token validation and automated email workflows for enhanced election security.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Custom Plugins'],
    githubUrl: 'https://github.com/Kazisakin/2FA-Universal-WP-Voting',
    imageUrl: '/assets/voting-platform.jpg',
  },
  {
    id: 5,
    title: 'ROBOFLIGHT Platform',
    description: 'Rebuilt educational robotics platform with modern Next.js architecture featuring SSR and optimized performance. Delivered fully responsive UI across mobile, tablet, and desktop with custom authentication system.',
    technologies: ['Next.js', 'React', 'TypeScript', 'REST API'],
    liveUrl: 'https://roboflight.ca/',
    imageUrl: '/assets/Roboflight_profile.png',
  },
];

// ============================================
// SKILLS DATA (Grouped by Category)
// ============================================
export const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'C', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },

  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'JavaFX', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'REST API', category: 'Backend' },

  // Tools
  { name: 'Docker', category: 'Tools' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Jenkins', category: 'Tools' },
  { name: 'Linux CLI', category: 'Tools' },
  { name: 'Maven', category: 'Tools' },
  { name: 'JUnit/TestNG', category: 'Tools' },
];

// ============================================
// EDUCATION DATA
// ============================================
export const education: Education[] = [
  {
    institution: 'University of New Brunswick',
    degree: 'Bachelor of Computer Science',
    period: 'Jan 2023 – Dec 2026',
    coursework: [
      'Data Structures and Algorithms',
      'Introduction to Databases',
      'Software Engineering',
      'System Software Development',
      'Machine-Level Programming',
    ],
  },
];

// ============================================
// EXPERIENCE DATA
// ============================================
export const experience: Experience[] = [
  {
    title: 'Web Developer',
    organization: 'ROBOFLIGHT',
    period: 'Dec 2023 – Dec 2024',
    description: [
      'Redeveloped platform with Next.js using React components and server-side rendering',
      'Created 5+ API endpoints and enhanced UI with responsive design for three device sizes',
    ],
  },
  {
    title: 'Webmaster',
    organization: 'Bangladesh Student Society, UNB',
    period: 'Dec 2023 – Oct 2024',
    description: [
      'Developed secure voting system enabling 100+ members to vote using PHP/MySQL',
      'Implemented 2FA email validation with 30-minute token limit',
    ],
  },
  {
    title: 'Manager – Customer Escalation Team',
    organization: 'IO Solutions',
    period: 'May 2025 – July 2025',
    description: [
      'Managed 5-10 daily escalations, resolving 90% on first contact',
      'Analyzed telecom datasets with 1,000+ records to improve fault resolution',
    ],
  },
];

// ============================================
// CERTIFICATIONS
// ============================================
export const certifications = [
  {
    title: 'R Programming Boot Camp',
    organization: 'Bangladesh University of Professional',
    year: '2023',
  },
  {
    title: 'Advanced WordPress Development',
    organization: 'Softech-IT',
    year: '2018',
  },
];

// ============================================
// INTERESTS & HOBBIES
// ============================================
export const interests = {
  title: 'Interests & Hobbies',
  description: 'Passionate about UI/UX design, motion graphics, and visual storytelling. I enjoy creating engaging user interfaces and dynamic animations that bring digital experiences to life. In my free time, I explore graphic design principles and experiment with modern design tools to craft compelling visual narratives.',
  link: 'https://www.behance.net/kazimostofasakin',
  linkText: 'View Design Portfolio on Behance',
};
