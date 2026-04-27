// ============================================
// DATA LAYER (Model in MVC Pattern)
// ============================================

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
  category: 'Languages' | 'Frontend' | 'Backend' | 'ML & AI' | 'Databases' | 'DevOps & Cloud' | 'Testing & QA' | 'Security' | 'Design Tools' | 'Networking' | 'CMS & Tools';
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
  subtitle: 'Full-Stack Developer · ML Researcher · Security Engineer',
  email: 'kazimostofa.sakin@unb.ca',
  phone: '+1 (506) 282-1327',
  github: 'https://github.com/Kazisakin',
  linkedin: 'https://linkedin.com/in/kazisakin',
  behance: 'https://www.behance.net/kazimostofasakin',
  designPortfolio: 'https://design.kazimostofasakin.com',
  resumeUrl: '/assets/Resume.pdf',
};

// ============================================
// INTRODUCTION
// ============================================
export const introduction = {
  greeting: 'Kazi Mostofa Sakin',
  description: 'Fourth-year Computer Science student at the University of New Brunswick with hands-on experience across full-stack web development, machine learning research, security testing, and brand design. Active certifications in API testing (ReadyAPI, Postman). Track record of shipping production systems with real users, conducting research at master\'s-level depth in differentially private LLM fine-tuning, and delivering professional design work for clients across Canada and Bangladesh.',
};

// ============================================
// PROJECTS DATA
// ============================================
export const projects: Project[] = [
  {
    id: 1,
    title: 'KrishiVet — Production E-Commerce Platform',
    description: 'Built a complete marketing and e-commerce platform from scratch for a veterinary supplement company using Next.js 16 with TypeScript. Includes a fully custom admin dashboard, email-based 2FA, XSS/CSRF hardening with strict CSP headers, JSON-LD structured data for SEO, and a dynamic blog system with slug-based routing.',
    technologies: ['Next.js 16', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS v4', 'Vercel'],
    liveUrl: 'https://krishivet.ca',
    imageUrl: '/assets/krishivet.png',
  },
  {
    id: 2,
    title: 'Differentially Private Text Generation (DP-SGD + GPT-2)',
    description: 'Fine-tuned 5 GPT-2 configurations with formal (ε,δ)-differential privacy guarantees using DP-SGD and LoRA on sensitive customer support data. Achieved 0% canary leakage on DP-distilgpt2 (perplexity 15.86) by resolving a HuggingFace Conv1D/Opacus incompatibility via a custom per-sample gradient sampler. Reduced PII memorisation from 95% (non-DP) to 0%.',
    technologies: ['Python', 'PyTorch', 'HuggingFace', 'Opacus', 'LoRA', 'Flask'],
    githubUrl: 'https://github.com/Kazisakin',
    imageUrl: '/assets/dp-project.png',
  },
  {
    id: 3,
    title: 'SMS Spam Classifier — ML Pipeline & Web App',
    description: 'Developed an ML-powered spam detection pipeline trained on 11,000+ messages with regex-based preprocessing and TF-IDF feature engineering. Trained and evaluated Logistic Regression, KNN, and Decision Tree classifiers achieving F1-score of 1.00. Deployed as a containerised Flask app with a user feedback loop triggering model retraining after 50+ labelled submissions.',
    technologies: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'Docker', 'Railway'],
    githubUrl: 'https://github.com/Kazisakin/SMS-Spam-Classifier',
    liveUrl: 'https://sms-spam-classifier-production.up.railway.app/',
    imageUrl: '/assets/spam-classifier.png',
  },
  {
    id: 4,
    title: 'Secure Feedback Web Application',
    description: 'Architected a multi-role secure feedback platform with Spring Boot and Spring Security, implementing RBAC and encrypted PostgreSQL storage. Conducted comprehensive threat modelling using STRIDE methodology and attack trees, identifying injection, authentication bypass, and authorisation flaws mapped to CWE. Containerised the full stack with Docker Compose.',
    technologies: ['Spring Boot', 'Spring Security', 'PostgreSQL', 'Docker', 'STRIDE'],
    githubUrl: 'https://github.com/Kazisakin/secure-feedback-app',
    imageUrl: '/assets/secure-feedback.png',
  },
  {
    id: 5,
    title: 'Wildfire Detection System — Technical Lead',
    description: 'Led a team building a wildfire detection and evacuation planning system in JavaFX. Created a 16×16 map UI displaying weather metrics (temperature, humidity, wind, dryness) with a latitude/longitude grid. Implemented a buffered data loader with linear filtering and a 24-hour forecast time slider. Led JUnit 5 test coverage spanning unit, integration, and boundary cases.',
    technologies: ['Java', 'JavaFX', 'JUnit 5', 'Maven'],
    githubUrl: 'https://github.com/Kazisakin/wfd-t12',
    imageUrl: '/assets/wildfire-project.png',
  },
  {
    id: 6,
    title: 'UNB BSS Secure Voting Platform',
    description: 'Automated the UNB Bangladesh Student Society election process for 100+ active members across 10+ vote categories. Implemented email-based 2FA with token access control, enforcing a 30-minute lockout after two failed login attempts. Conducted vulnerability assessment, designed the MySQL schema, and produced comprehensive documentation for future maintainers.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'Apache'],
    githubUrl: 'https://github.com/Kazisakin/2FA-Universal-WP-Voting',
    imageUrl: '/assets/voting-platform.jpg',
  },
];

// ============================================
// SKILLS DATA (Grouped by Category)
// ============================================
export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'C', category: 'Languages' },
  { name: 'PHP', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'Bash', category: 'Languages' },
  { name: 'R', category: 'Languages' },

  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'HTML5 / CSS3', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },

  // ML & AI
  { name: 'PyTorch', category: 'ML & AI' },
  { name: 'TensorFlow', category: 'ML & AI' },
  { name: 'HuggingFace Transformers', category: 'ML & AI' },
  { name: 'Opacus (DP-SGD)', category: 'ML & AI' },
  { name: 'LoRA / GPT-2 Fine-tuning', category: 'ML & AI' },
  { name: 'Scikit-learn', category: 'ML & AI' },
  { name: 'Pandas / NumPy', category: 'ML & AI' },
  { name: 'Prompt Engineering', category: 'ML & AI' },

  // Databases
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'SQLite', category: 'Databases' },
  { name: 'Prisma ORM', category: 'Databases' },
  { name: 'REST APIs', category: 'Databases' },

  // DevOps & Cloud
  { name: 'Docker', category: 'DevOps & Cloud' },
  { name: 'Git / GitHub', category: 'DevOps & Cloud' },
  { name: 'GitHub Actions / CI-CD', category: 'DevOps & Cloud' },
  { name: 'Linux (Ubuntu / Debian)', category: 'DevOps & Cloud' },
  { name: 'AWS', category: 'DevOps & Cloud' },
  { name: 'Vercel / Netlify / Railway', category: 'DevOps & Cloud' },

  // Testing & QA
  { name: 'JUnit 5', category: 'Testing & QA' },
  { name: 'ReadyAPI', category: 'Testing & QA' },
  { name: 'Postman', category: 'Testing & QA' },
  { name: 'STRIDE Threat Modelling', category: 'Testing & QA' },
  { name: 'Vulnerability Assessment', category: 'Testing & QA' },
  { name: 'Attack Tree Analysis', category: 'Testing & QA' },

  // Security
  { name: 'Spring Security / RBAC', category: 'Security' },
  { name: '2FA / OTP', category: 'Security' },
  { name: 'Differential Privacy (DP-SGD)', category: 'Security' },
  { name: 'XSS / CSRF / SQL Injection Prevention', category: 'Security' },
  { name: 'CSP Headers / Rate Limiting', category: 'Security' },
  { name: 'Cryptography', category: 'Security' },

  // Design Tools
  { name: 'Figma', category: 'Design Tools' },
  { name: 'Adobe XD', category: 'Design Tools' },
  { name: 'Photoshop', category: 'Design Tools' },
  { name: 'Illustrator', category: 'Design Tools' },
  { name: 'Premiere Pro', category: 'Design Tools' },
  { name: 'After Effects', category: 'Design Tools' },

  // Networking
  { name: 'TCP/UDP Sockets', category: 'Networking' },
  { name: 'DHCP / NAT', category: 'Networking' },
  { name: 'Wireshark', category: 'Networking' },
  { name: 'IP Networking Fundamentals', category: 'Networking' },

  // CMS & Tools
  { name: 'WordPress', category: 'CMS & Tools' },
  { name: 'WooCommerce', category: 'CMS & Tools' },
  { name: 'Maven', category: 'CMS & Tools' },
  { name: 'Jira', category: 'CMS & Tools' },
  { name: 'Trello', category: 'CMS & Tools' },
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
      'Data Structures & Algorithms',
      'Database Systems (CS2503)',
      'Software Engineering',
      'Software Security (CS4417)',
      'Foundations of Privacy (CS4413)',
      'Data Mining',
      'Computer Networks (CS3873)',
      'Operating Systems (CS3413)',
      'UI Design (CS3035)',
      'Server Administration & Security (KIT304)',
      'Computability & Formal Languages (CS2333)',
      'Java I & II (CS1083)',
      'Discrete Mathematics',
      'Linear Algebra',
      'Probability & Statistics (STAT 2593)',
      'Cyberviolence (SOCI2003)',
    ],
  },
];

// ============================================
// EXPERIENCE DATA
// ============================================
export const experience: Experience[] = [
  {
    title: 'Manager, Customer Escalation Team',
    organization: 'IO Solutions — Fredericton, NB',
    period: 'May 2025 – Jul 2025',
    description: [
      'Managed 5–10 daily escalations for Rogers and Fido covering network connectivity, billing, and device configuration; resolved 90% on first contact',
      'Coached 4 agents on escalation protocols and effective customer communication, boosting team efficiency',
      'Analysed telecom datasets with 1,000+ records to identify recurring fault patterns and improve resolution strategies',
    ],
  },
  {
    title: 'Customer Care Specialist',
    organization: 'IO Solutions — Fredericton, NB',
    period: 'May 2023 – Apr 2025',
    description: [
      'Supported 20+ daily customer inquiries across Fido, Rogers, Cityfone, and Shaw with empathetic communication',
      'Achieved highest sales performance for two consecutive periods by identifying wireless plan upgrades and add-ons',
      'Managed migrations across multiple telecom carriers, reducing client downtime by 3 hours weekly for 40+ clients',
      'Received commendation as Most Knowledgeable Representative for handling complex billing and technical issues',
    ],
  },
  {
    title: 'Full-Stack Developer (Volunteer)',
    organization: 'KrishiVet Nutra Solution — krishivet.ca',
    period: '2024 – Present',
    description: [
      'Designed and developed the complete website, brand identity, and admin dashboard for a veterinary supplement company',
      'Implemented 2FA admin authentication, XSS/CSRF hardening, CSP headers, and SEO with JSON-LD structured data',
      'Ongoing maintenance and feature development using Next.js 16, PostgreSQL, and Prisma ORM on Vercel',
    ],
  },
  {
    title: 'Web Developer & Brand Designer',
    organization: 'Roboight — roboight.ca',
    period: 'Dec 2023 – Dec 2024',
    description: [
      'Rebuilt the platform in Next.js using React, TypeScript, and ES6 with login, registration, password reset, and 5+ REST API endpoints',
      'Designed the organisation\'s logo and complete brand identity including colour palette, typography, and visual guidelines',
    ],
  },
  {
    title: 'Webmaster',
    organization: 'Bangladesh Student Society — University of New Brunswick',
    period: 'Dec 2023 – Oct 2024',
    description: [
      'Built the society\'s first WordPress website, improving accessibility for 150+ active members in collaboration with faculty',
      'Integrated member registration, login, and an online voting system that reduced manual effort and increased event participation',
    ],
  },
  {
    title: 'Motion Graphic & UI/UX Designer (Contract)',
    organization: 'EGC LTD — Dhaka, Bangladesh',
    period: 'Jul 2020 – Dec 2022',
    description: [
      'Designed 30+ motion graphics projects that elevated viewer engagement and brand visibility across digital platforms',
      'Created 15+ prototypes and wireframes improving user experience metrics by 25%, delivering intuitive navigation for end-users',
      'Developed animations using Adobe Creative Suite (After Effects, Premiere Pro, Photoshop, Illustrator), achieving a 30% increase in client satisfaction ratings',
    ],
  },
];

// ============================================
// CERTIFICATIONS
// ============================================
export const certifications = [
  {
    title: 'ReadyAPI: API Test Engineer — Basics',
    organization: 'SmartBear',
    year: 'Feb 2026',
  },
  {
    title: 'Postman API Fundamentals Student Expert',
    organization: 'Postman',
    year: 'Jan 2026',
  },
  {
    title: 'R Programming Boot Camp',
    organization: 'Bangladesh University of Professional Economics Club',
    year: '2023',
  },
  {
    title: 'Advanced WordPress Development',
    organization: 'Softech-IT',
    year: '2018',
  },
];

// ============================================
// DESIGN & CREATIVE WORK
// ============================================
export const interests = {
  title: 'Design & Creative Work',
  description: 'Experienced in brand identity, UI/UX design, motion graphics, and visual storytelling using Figma, Adobe XD, Photoshop, Illustrator, Premiere Pro, and After Effects. Portfolio spans full brand systems, packaging design, and motion graphics campaigns for clients across Canada and Bangladesh — including KrishiVet, Roboight, The Feyre, Miyabi, and ACC ECO AMICA Club.',
  link: 'https://design.kazimostofasakin.com',
  linkText: 'View Full Design Portfolio',
};
