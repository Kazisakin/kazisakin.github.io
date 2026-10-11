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
  location?: string;
  period: string;
  description: string[];
  summary: string; // one plain sentence shown on the site
  type: 'work' | 'volunteer';
  logo?: string;
}

// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: 'Kazi Mostofa Sakin',
  title: 'Computer Science Student',
  subtitle: 'Software Developer · QA Tester',
  location: 'Fredericton, NB',
  availability: 'Open to co-op & internships · Winter 2027',
  email: 'kazimostofa.sakin@unb.ca',
  phone: '+1 (506) 282-1327',
  github: 'https://github.com/Kazisakin',
  linkedin: 'https://linkedin.com/in/kazisakin',
  behance: 'https://www.behance.net/kazimostofasakin',
  designPortfolio: 'https://design.kazimostofasakin.com',
  resumeUrl: '/assets/Kazi-Mostofa-Sakin-Resume.pdf',
};

// ============================================
// INTRODUCTION
// ============================================
export const introduction = {
  greeting: 'Kazi Mostofa Sakin',
  tagline: 'I build web apps and make sure they work.',
  role: 'Software developer & QA tester',
  description:
    'Computer Science student at the University of New Brunswick with experience in full-stack development, software testing and UI design.',
};

// Short "who I am" copy (editorial theme)
export const about = {
  paragraphs: [
    'I’m Kazi, a fourth-year Computer Science student at the University of New Brunswick in Fredericton.',
    'I like building things people actually use. I built the online store for KrishiVet, an animal-health company, and rebuilt the website for RoboFlight, a kids’ robotics school in Fredericton.',
    'Before computer science I worked as a graphic designer, so I care about how software looks and feels, not just whether it runs. Two years in customer support taught me the other half: test from the user’s side, and find the bug before they do.',
    'I’m looking for a software development or QA co-op for Winter 2027.',
  ],
  principles: [],
};

// Proof strip (editorial theme). Keep these numbers accurate.
export const stats = [
  { value: '4th', label: 'year of Computer Science at UNB' },
  { value: '7+', label: 'projects built' },
  { value: '90%', label: 'customer issues solved on the first call' },
];

// Short work history for the editorial theme (one line each).
// type separates paid work from unpaid volunteer roles.
export interface TimelineItem {
  period: string;
  role: string;
  org: string;
  note: string;
  type: 'work' | 'volunteer';
  logo?: string;
}

export const timeline: TimelineItem[] = [
  {
    period: 'Jun 2026 – Present',
    role: 'Spot Quoter (Part-time)',
    org: 'Day & Ross, Fredericton',
    note: 'I price one-off freight shipments for customers and fix quote issues in an Oracle-based system.',
    type: 'work',
    logo: '/assets/dayross.jpg',
  },
  {
    period: 'May 2025 – Jul 2025',
    role: 'Manager, Customer Escalation Team',
    org: 'IO Solutions',
    note: 'Led escalations for 1,000+ Rogers and Fido accounts. Solved 90% on the first call and coached 4 agents.',
    type: 'work',
    logo: '/assets/iosolutiuon.png',
  },
  {
    period: 'May 2023 – Apr 2025',
    role: 'Customer Care Specialist',
    org: 'IO Solutions',
    note: 'Fixed phone, internet and billing problems for 20+ customers a day. Named Most Knowledgeable Representative twice.',
    type: 'work',
    logo: '/assets/iosolutiuon.png',
  },
  {
    period: 'Jul 2020 – Dec 2022',
    role: 'Graphic & UI Designer',
    org: 'EGC Ltd, Dhaka',
    note: 'Designed logos, brand kits, ads, animations and app screens.',
    type: 'work',
  },
  {
    period: '2024 – Present',
    role: 'Full-Stack Developer (Volunteer)',
    org: 'KrishiVet Nutra Solution',
    note: 'Built and run the company’s online store and its secure admin panel.',
    type: 'volunteer',
    logo: '/assets/krishivet.png',
  },
  {
    period: 'Dec 2023 – Dec 2024',
    role: 'Web Developer & Brand Designer (Volunteer)',
    org: 'RoboFlight',
    note: 'Rebuilt the website in Next.js and designed the brand.',
    type: 'volunteer',
    logo: '/assets/roboflight.png',
  },
  {
    period: 'Dec 2023 – Oct 2024',
    role: 'Webmaster (Volunteer)',
    org: 'Bangladesh Student Society, UNB',
    note: 'Built an online voting system with email verification, used by 150+ students.',
    type: 'volunteer',
  },
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
  { name: 'RoboFlight', logo: '/assets/roboflight.png' },
];

// ============================================
// PROJECTS DATA
// ============================================
export const projects: Project[] = [
  {
    id: 1,
    title: 'KrishiVet Online Store',
    description:
      'E-commerce platform for an animal-health company, featuring a secure admin panel and two-factor authentication.',
    context: 'Full-stack development',
    highlight: 'Live in production',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://krishivet.ca',
    imageUrl: '/assets/krishivet.png',
  },
  {
    id: 2,
    title: 'Privacy-Preserving Text Generation',
    description:
      'Fine-tuned GPT-2 with differential privacy to prevent leakage of sensitive training data.',
    context: 'AI privacy research',
    highlight: 'Data leakage: 95% → 0%',
    technologies: ['Python', 'PyTorch', 'HuggingFace', 'Opacus'],
    githubUrl: 'https://github.com/Kazisakin',
    imageUrl: '/assets/dp-project.png',
  },
  {
    id: 3,
    title: 'SMS Spam Classifier',
    description:
      'Spam detection model trained on 11,000+ SMS messages and deployed as a live web application.',
    context: 'Machine learning',
    highlight: 'F1 score: 1.00',
    technologies: ['Python', 'Scikit-learn', 'Flask', 'Docker'],
    githubUrl: 'https://github.com/Kazisakin/SMS-Spam-Classifier',
    liveUrl: 'https://sms-spam-classifier-production.up.railway.app/',
    imageUrl: '/assets/spam-classifier.png',
  },
  {
    id: 7,
    title: 'AI Support Ticket Classifier',
    description:
      'Automatically categorizes support tickets using the Claude API, with a real-time dashboard.',
    context: 'Applied AI',
    highlight: 'Live demo',
    technologies: ['Python', 'FastAPI', 'Claude API', 'Docker'],
    githubUrl: 'https://github.com/Kazisakin/llm-case-classifier-app',
    liveUrl: 'https://llm-case-classifier-app-igs3.vercel.app',
    imageUrl: '/assets/llm-classifier.png',
  },
  {
    id: 4,
    title: 'Secure Feedback App',
    description:
      'Feedback application with role-based access control, designed with security as a core requirement.',
    context: 'Software security',
    highlight: 'Role-based access',
    technologies: ['Spring Boot', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Kazisakin/secure-feedback-app',
    imageUrl: '/assets/secure-feedback.png',
  },
  {
    id: 5,
    title: 'Wildfire Detection System',
    description:
      'Simulates wildfire spread and plans evacuation routes. Led the development team.',
    context: 'Team project',
    highlight: 'Team lead',
    technologies: ['Java', 'JavaFX', 'JUnit 5'],
    githubUrl: 'https://github.com/Kazisakin/wfd-t12',
    imageUrl: '/assets/wildfire-project.png',
  },
  {
    id: 6,
    title: 'UNB BSS Voting Platform',
    description:
      'Online election platform for a UNB student society, with email-based vote verification.',
    context: 'Web app',
    highlight: '150+ voters',
    technologies: ['PHP', 'MySQL', 'WordPress'],
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
  { name: 'C / C++', category: 'Languages' },

  { name: 'React / Next.js', category: 'Web & Backend' },
  { name: 'Spring Boot', category: 'Web & Backend' },
  { name: 'Flask / FastAPI', category: 'Web & Backend' },
  { name: 'Node.js', category: 'Web & Backend' },
  { name: 'PostgreSQL', category: 'Web & Backend' },
  { name: 'REST APIs', category: 'Web & Backend' },

  { name: 'Postman (API Testing)', category: 'Testing & Tools' },
  { name: 'ReadyAPI', category: 'Testing & Tools' },
  { name: 'Selenium WebDriver', category: 'Testing & Tools' },
  { name: 'JUnit 5', category: 'Testing & Tools' },
  { name: 'Docker', category: 'Testing & Tools' },
  { name: 'Git / GitHub Actions', category: 'Testing & Tools' },

  { name: 'Figma', category: 'Design' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'Illustrator', category: 'Design' },
  { name: 'UI / UX Wireframing', category: 'Design' },
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
      'Natural Language Processing',
    ],
    currentCourses: [],
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
    summary: 'Prepare spot freight quotes for commercial customers and resolve quoting issues in an Oracle-based system.',
    organization: 'Day & Ross',
    location: 'Fredericton, NB',
    logo: '/assets/dayross.jpg',
    period: 'Jun 2026 – Present',
    description: [
      'Price spot freight quotes for business customers in an Oracle-based quoting system.',
      'Resolve quote tickets so every price sent to a customer is accurate.',
    ],
    type: 'work',
  },
  {
    title: 'Manager, Customer Escalation Team',
    summary: 'Led the Rogers and Fido escalation team, achieving 90% first-call resolution and coaching four agents.',
    organization: 'IO Solutions',
    location: 'Fredericton, NB',
    logo: '/assets/iosolutiuon.png',
    period: 'May 2025 – Jul 2025',
    description: [
      'Promoted from Customer Care Specialist to lead the escalation team.',
      'Solved 90% of escalated cases on the first contact across 1,000+ Rogers and Fido accounts.',
      'Coached 4 agents on handling difficult customers and cases.',
    ],
    type: 'work',
  },
  {
    title: 'Customer Care Specialist',
    summary: 'Resolved phone, internet and billing inquiries for 20+ customers daily; twice named Most Knowledgeable Representative.',
    organization: 'IO Solutions',
    location: 'Fredericton, NB',
    logo: '/assets/iosolutiuon.png',
    period: 'May 2023 – Apr 2025',
    description: [
      'Solved technical and billing problems for 20+ customers a day.',
      'Named Most Knowledgeable Representative twice.',
      'Top sales performer two periods in a row.',
    ],
    type: 'work',
  },
  {
    title: 'Graphic & UI Designer',
    summary: 'Designed logos, brand identities, marketing campaigns and application interfaces for clients.',
    organization: 'EGC Ltd',
    location: 'Dhaka, Bangladesh',
    period: 'Jul 2020 – Dec 2022',
    description: [
      'Created brand identities, logos and marketing campaigns for clients.',
      'Designed UI prototypes for web and mobile apps.',
      'Produced motion graphics for promotions.',
    ],
    type: 'work',
  },
  {
    title: 'Full-Stack Developer (Volunteer)',
    summary: 'Developed and maintain the company’s live e-commerce platform, including a secure admin dashboard.',
    organization: 'KrishiVet Nutra Solution',
    logo: '/assets/krishivet.png',
    period: '2024 – Present',
    description: [
      'Built the company’s live online store with Next.js, TypeScript and PostgreSQL.',
      'Added a secure admin dashboard with two-step login.',
      'Designed the brand and maintain the site.',
    ],
    type: 'volunteer',
  },
  {
    title: 'Web Developer & Brand Designer (Volunteer)',
    summary: 'Rebuilt the website in Next.js and developed the brand identity for a youth robotics school.',
    organization: 'RoboFlight',
    location: 'Fredericton, NB',
    logo: '/assets/roboflight.png',
    period: 'Dec 2023 – Dec 2024',
    description: [
      'Rebuilt the website in Next.js and TypeScript with secure login.',
      'Designed the full brand identity.',
    ],
    type: 'volunteer',
  },
  {
    title: 'Webmaster (Volunteer)',
    summary: 'Built the society’s first website and an online voting system used by 150+ students.',
    organization: 'Bangladesh Student Society, UNB',
    location: 'Fredericton, NB',
    period: 'Dec 2023 – Oct 2024',
    description: [
      'Built the society’s first website.',
      'Built an online voting system with email verification, used by 150+ students.',
    ],
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
// HUMAN-COMPUTER INTERACTION & PRODUCT DESIGN
// ============================================
export const interests = {
  title: 'Human-Computer Interaction & Product Design',
  description:
    'Five years of graphic design experience brings a strong focus on usability and visual quality.',
  link: 'https://design.kazimostofasakin.com',
  linkText: 'View design portfolio',
};
