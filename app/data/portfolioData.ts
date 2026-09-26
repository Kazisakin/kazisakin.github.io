// ============================================
// DATA LAYER (Model in MVC Pattern)
// ============================================
// Both themes (classic + editorial) read from this file.
// Keep text short: one idea per line, numbers where you have them.

export interface Project {
  id: number;
  title: string;
  description: string;
  highlight: string; // one short result, shown as a badge in the editorial theme
  context: string; // project type, e.g. 'Team Project · Software Engineering'
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Web & Backend' | 'Testing & Tools' | 'Design';
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  graduation: string;
  coursework: string[];
  currentCourses: string[];
  highlights: string[];
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: 'work' | 'volunteer';
}

// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: 'Kazi Mostofa Sakin',
  title: 'Computer Science Student',
  subtitle: 'Full-Stack Developer · QA & Automation · Designer',
  location: 'Fredericton, NB',
  availability: 'Seeking co-op & internship opportunities',
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
  tagline: 'I build, test, and design for the web.',
  role: 'Software Development · QA & Automation · UI/UX Design',
  description:
    'Fourth-year Computer Science student at the University of New Brunswick, seeking co-op and internship opportunities in software development and QA automation.',
};

// Short "who I am" copy + working principles (editorial theme)
export const about = {
  paragraphs: [
    'I am a fourth-year Computer Science student with hands-on experience in full-stack development, software testing, and security. My academic work spans software engineering, databases, privacy, and machine learning.',
    'Before university, I spent over two years as a professional designer. That background helps me build software that is reliable, secure, and easy to use.',
  ],
  principles: [
    { title: 'Test before you trust', text: 'API tests, unit tests, and edge cases come first, not last.' },
    { title: 'Secure by default', text: '2FA, input validation, and least-privilege access in every build.' },
    { title: 'Design is the product', text: 'Clear, simple interfaces that real users understand.' },
  ],
};

// Proof strip (editorial theme). Keep these numbers accurate.
export const stats = [
  { value: '25+', label: 'Academic & personal projects' },
  { value: '300+', label: 'Design projects completed' },
  { value: '150+', label: 'Members on sites I built' },
];

// Short work history for the editorial theme (one line each).
// type separates paid work from unpaid volunteer roles.
export const timeline: { period: string; role: string; org: string; note: string; type: 'work' | 'volunteer' }[] = [
  { period: 'Jun 2026 – Present', role: 'Spot Quoter (Part-time)', org: 'Day & Ross, Fredericton', note: 'Prepare and issue freight spot quotes daily from current rate data, and resolve pricing and shipment tickets with carriers.', type: 'work' },
  { period: 'May 2025 – Jul 2025', role: 'Manager, Customer Escalation Team', org: 'IO Solutions', note: 'Resolved 90% of Rogers and Fido escalations on first contact and coached four agents on escalation protocols.', type: 'work' },
  { period: 'May 2023 – Apr 2025', role: 'Customer Care Specialist', org: 'IO Solutions', note: 'Supported 20+ customers daily; recognised as Most Knowledgeable Representative and top sales performer for two consecutive periods.', type: 'work' },
  { period: 'Jul 2020 – Dec 2022', role: 'Motion Graphic & UI/UX Designer', org: 'EGC Ltd, Dhaka', note: 'Delivered 30+ motion graphics projects and 15+ prototypes and wireframes for client products.', type: 'work' },
  { period: '2024 – Present', role: 'Full-Stack Developer (Volunteer)', org: 'KrishiVet Nutra Solution', note: 'Build and maintain the company website, e-commerce platform, and admin dashboard, including authentication and SEO.', type: 'volunteer' },
  { period: 'Dec 2023 – Dec 2024', role: 'Web Developer & Brand Designer (Volunteer)', org: 'Roboight', note: 'Rebuilt the platform in Next.js and TypeScript with authentication and REST APIs, and designed the brand identity.', type: 'volunteer' },
  { period: 'Dec 2023 – Oct 2024', role: 'Webmaster (Volunteer)', org: 'Bangladesh Student Society, UNB', note: 'Built the society’s first website with member registration and online voting for 150+ members.', type: 'volunteer' },
];

// Organisations I have worked with, shown as a logo strip (editorial theme)
export interface WorkedWithOrg {
  name: string;
  logo: string;
}

export const workedWith: WorkedWithOrg[] = [
  { name: 'Day & Ross', logo: '/assets/dayross.jpg' },
  { name: 'KrishiVet', logo: '/assets/krishivet.png' },
  { name: 'IO Solutions', logo: '/assets/iosolutiuon.png' },
  { name: 'Roboight', logo: '/assets/roboflight.png' },
];

// ============================================
// PROJECTS DATA
// ============================================
export const projects: Project[] = [
  {
    id: 1,
    title: 'KrishiVet — E-Commerce Platform',
    description:
      'Designed and developed a production e-commerce platform for a veterinary supplement company. Modelled an 8-entity PostgreSQL schema and built a custom admin dashboard with two-factor authentication and XSS/CSRF protection.',
    context: 'Client Project',
    highlight: 'Live in production',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://krishivet.ca',
    imageUrl: '/assets/krishivet.png',
  },
  {
    id: 2,
    title: 'Private Text Generation with GPT-2',
    description:
      'Fine-tuned five GPT-2 configurations with differential privacy (DP-SGD and LoRA) on sensitive customer-support data. Reduced personal-data memorisation from 95% to 0% while keeping the model usable.',
    context: 'Course Project · CS4413 Foundations of Privacy',
    highlight: 'PII leakage 95% → 0%',
    technologies: ['Python', 'PyTorch', 'HuggingFace', 'Opacus'],
    githubUrl: 'https://github.com/Kazisakin',
    imageUrl: '/assets/dp-project.png',
  },
  {
    id: 3,
    title: 'SMS Spam Classifier',
    description:
      'Built a spam-detection pipeline with TF-IDF features, comparing Logistic Regression, KNN, and Decision Tree models on 11,000+ messages. Deployed as a containerised Flask app that retrains from user feedback.',
    context: 'Machine Learning Project',
    highlight: 'Trained on 11,000+ messages',
    technologies: ['Python', 'Scikit-learn', 'Flask', 'Docker'],
    githubUrl: 'https://github.com/Kazisakin/SMS-Spam-Classifier',
    liveUrl: 'https://sms-spam-classifier-production.up.railway.app/',
    imageUrl: '/assets/spam-classifier.png',
  },
  {
    id: 7,
    title: 'LLM Case Classifier — AI Operations Dashboard',
    description:
      'Built a dashboard that uses the Claude API to read incoming issues and sort them into categories automatically, removing manual triage. Deployed the FastAPI backend to Google Cloud Run and the frontend to Vercel, with PostgreSQL and Chart.js.',
    context: 'Personal Project · Applied AI',
    highlight: 'Live on Cloud Run + Vercel',
    technologies: ['Python', 'FastAPI', 'Claude API', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Kazisakin/llm-case-classifier-app',
    liveUrl: 'https://llm-case-classifier-app-igs3.vercel.app',
    imageUrl: '/assets/llm-classifier.png',
  },
  {
    id: 4,
    title: 'Secure Feedback App',
    description:
      'Developed a multi-role feedback platform with Spring Security, role-based access control, and encrypted PostgreSQL storage. Performed STRIDE threat modelling and attack-tree analysis, mapping findings to CWE.',
    context: 'Academic Project · Software Security',
    highlight: 'Threat-modelled with STRIDE',
    technologies: ['Spring Boot', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Kazisakin/secure-feedback-app',
    imageUrl: '/assets/secure-feedback.png',
  },
  {
    id: 5,
    title: 'Wildfire Detection System',
    description:
      'Led a student team building a JavaFX wildfire detection and evacuation-planning tool with a weather-risk map and 24-hour forecast slider. Owned the JUnit 5 test strategy across unit, integration, and boundary cases.',
    context: 'Team Project · Software Engineering',
    highlight: 'Technical lead',
    technologies: ['Java', 'JavaFX', 'JUnit 5'],
    githubUrl: 'https://github.com/Kazisakin/wfd-t12',
    imageUrl: '/assets/wildfire-project.png',
  },
  {
    id: 6,
    title: 'UNB BSS Voting Platform',
    description:
      'Automated elections for the UNB Bangladesh Student Society across 10+ vote categories. Implemented email 2FA with token-based access, a login lockout policy, and a documented MySQL schema.',
    context: 'Student Organization',
    highlight: 'Built for 100+ members',
    technologies: ['WordPress', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/Kazisakin/2FA-Universal-WP-Voting',
    imageUrl: '/assets/voting-platform.jpg',
  },
];

// ============================================
// SKILLS DATA — only what I use regularly
// ============================================
export const skills: Skill[] = [
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'TypeScript / JavaScript', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },

  { name: 'React / Next.js', category: 'Web & Backend' },
  { name: 'Spring Boot', category: 'Web & Backend' },
  { name: 'Flask / FastAPI', category: 'Web & Backend' },
  { name: 'PostgreSQL', category: 'Web & Backend' },

  { name: 'Postman', category: 'Testing & Tools' },
  { name: 'ReadyAPI', category: 'Testing & Tools' },
  { name: 'Selenium WebDriver', category: 'Testing & Tools' },
  { name: 'JUnit 5', category: 'Testing & Tools' },
  { name: 'Docker', category: 'Testing & Tools' },
  { name: 'Git / GitHub', category: 'Testing & Tools' },

  { name: 'Figma', category: 'Design' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'Illustrator', category: 'Design' },
  { name: 'After Effects', category: 'Design' },
];

// ============================================
// EDUCATION DATA
// ============================================
export const education: Education[] = [
  {
    institution: 'University of New Brunswick',
    degree: 'Bachelor of Computer Science',
    period: 'Jan 2023 – May 2027',
    graduation: 'May 2027',
    coursework: [
      'Software Engineering',
      'Data Structures & Algorithms',
      'Database Systems',
      'Software Security',
      'Information Security',
      'Foundations of Privacy',
      'Data Mining',
      'Systems Software Development',
      'Machine-Level Programming',
      'User Interface Design',
    ],
    currentCourses: ['Operating Systems', 'Computer Architecture', 'Net-Centric Computing'],
    highlights: [
      'Technical Lead, Wildfire Detection System (Software Engineering team project)',
      'Course research project on privacy-preserving language models (CS4413 Foundations of Privacy)',
    ],
  },
];

// ============================================
// EXPERIENCE DATA
// ============================================
export const experience: Experience[] = [
  {
    title: 'Spot Quoter (Part-time)',
    organization: 'Day & Ross — Fredericton, NB',
    period: 'Jun 2026 – Present',
    description: [
      'Prepare and issue accurate freight spot quotes daily using current rate data and shipment details.',
      'Resolve pricing and shipment tickets by coordinating with carriers.',
    ],
    type: 'work',
  },
  {
    title: 'Manager, Customer Escalation Team',
    organization: 'IO Solutions — Fredericton, NB',
    period: 'May 2025 – Jul 2025',
    description: [
      'Resolved 90% of Rogers and Fido escalations on first contact.',
      'Coached 4 agents on escalation handling.',
    ],
    type: 'work',
  },
  {
    title: 'Customer Care Specialist',
    organization: 'IO Solutions — Fredericton, NB',
    period: 'May 2023 – Apr 2025',
    description: [
      'Top sales performer for two consecutive periods.',
      'Named Most Knowledgeable Representative for complex billing and technical issues.',
    ],
    type: 'work',
  },
  {
    title: 'Motion Graphic & UI/UX Designer',
    organization: 'EGC Ltd — Dhaka, Bangladesh',
    period: 'Jul 2020 – Dec 2022',
    description: ['Delivered 30+ motion graphics projects and 15+ UI prototypes for clients.'],
    type: 'work',
  },
  {
    title: 'Full-Stack Developer (Volunteer)',
    organization: 'KrishiVet Nutra Solution',
    period: '2024 – Present',
    description: ['Built and maintain the company website, brand, and admin dashboard.'],
    type: 'volunteer',
  },
  {
    title: 'Web Developer & Brand Designer (Volunteer)',
    organization: 'Roboight',
    period: 'Dec 2023 – Dec 2024',
    description: ['Rebuilt the platform in Next.js and designed the full brand identity.'],
    type: 'volunteer',
  },
  {
    title: 'Webmaster (Volunteer)',
    organization: 'Bangladesh Student Society — UNB',
    period: 'Dec 2023 – Oct 2024',
    description: ['Built the society’s first website and online voting for 150+ members.'],
    type: 'volunteer',
  },
];

// ============================================
// CERTIFICATIONS
// ============================================
export const certifications = [
  { title: 'ReadyAPI: API Test Engineer — Basics', short: 'ReadyAPI API Testing', organization: 'SmartBear', year: 'Feb 2026' },
  { title: 'Postman API Fundamentals Student Expert', short: 'API Fundamentals Expert', organization: 'Postman', year: 'Jan 2026' },
  { title: 'R Programming Boot Camp', short: 'R Programming', organization: 'BUP Economics Club', year: '2023' },
  { title: 'Advanced WordPress Development', short: 'Advanced WordPress', organization: 'Softech-IT', year: '2018' },
];

// ============================================
// DESIGN & CREATIVE WORK
// ============================================
export const interests = {
  title: 'Design & Creative Work',
  description:
    'Nearly five years of professional experience in brand identity, UI/UX, and motion graphics for clients in Canada and Bangladesh.',
  link: 'https://design.kazimostofasakin.com',
  linkText: 'View Design Portfolio',
};
