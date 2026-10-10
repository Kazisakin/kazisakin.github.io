import React from 'react';

interface SkillIconProps {
  name: string;
  className?: string;
}

export default function SkillIcon({ name, className = 'h-5 w-5' }: SkillIconProps) {
  const n = name.toLowerCase();

  // Python
  if (n.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9 2c-3.1 0-5.1 1.4-5.1 4.1v2.1h5.3v.7H4.3C2.4 8.9 1 10.7 1 13.1c0 2.6 1.6 4.3 4.1 4.3h1.8v-2.3c0-2.3 2-4.1 4.3-4.1h5.3v-1.8c0-2.6-2.1-4.2-4.6-4.2v-3zm-2.2 1.9a1 1 0 110 2 1 1 0 010-2z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c3.1 0 5.1-1.4 5.1-4.1v-2.1h-5.3v-.7h7.8c1.9 0 3.3-1.8 3.3-4.2 0-2.6-1.6-4.3-4.1-4.3h-1.8v2.3c0 2.3-2 4.1-4.3 4.1H7.5v1.8c0 2.6 2.1 4.2 4.6 4.2v3zm2.2-1.9a1 1 0 110-2 1 1 0 010 2z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  // Java
  if (n === 'java' || (n.includes('java') && !n.includes('script') && !n.includes('fx'))) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M8.5 17.5c0 1.2 3.5 1.5 7 0 1.8-.8 3.5-2.2 3.5-3.5 0-.5-.3-.9-.7-1.1-.5.9-2.5 1.7-4.8 1.9-2.7.2-5-.3-5-1.3 0-.3.2-.6.5-.9-1.2.6-1.9 1.4-1.9 2.1z"
          fill="#E76F00"
        />
        <path
          d="M17.3 11.2c.4-.6 1.7-1.4 1.7-2.6 0-1.7-2.4-2.8-5.3-2.8-2.6 0-4.6.9-5.1 2.1 2.2-.4 4.8-.2 6.8.9 1.1.6 1.6 1.5 1.9 2.4z"
          fill="#5382A1"
        />
        <path
          d="M7 19.5c2.4 1.2 7.7 1.2 10.2 0 1.1-.5 1.8-1.2 1.8-1.9 0-.2-.1-.4-.2-.6-.9 1.1-3.6 1.8-6.8 1.8-3.4 0-5.8-.8-6.6-1.8-.1.2-.2.4-.2.6 0 .7.7 1.4 1.8 1.9z"
          fill="#E76F00"
        />
        <path
          d="M14.6 3.2c1.2 1.3-.2 3.1-1.3 4.3-.8.9-1.3 1.9-.9 2.9-1.3-.9-1.7-2.3-1.1-3.6.8-1.7 2.5-2.4 3.3-3.6z"
          fill="#5382A1"
        />
      </svg>
    );
  }

  // TypeScript / JavaScript
  if (n.includes('typescript') || n.includes('javascript')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M12.5 17.5v-8h-3V7.2h8.3v2.3h-3v8h-2.3zm5.7 0c-.8 0-1.5-.2-2.1-.6v-2.3c.7.5 1.4.8 2.2.8.6 0 1-.2 1-.6 0-.3-.2-.5-.8-.7l-.8-.3c-1.3-.4-2-1.2-2-2.4 0-1.6 1.2-2.6 3.1-2.6.7 0 1.4.2 2 .5v2.2c-.6-.4-1.3-.6-1.9-.6-.5 0-.8.2-.8.5 0 .3.2.5.7.7l.8.3c1.5.5 2.1 1.4 2.1 2.5-.1 1.7-1.3 2.7-3.3 2.7z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // SQL
  if (n === 'sql' || n.includes('database')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#F59E0B" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="#F59E0B" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#F59E0B" />
      </svg>
    );
  }

  // C / C++
  if (n.includes('c / c++') || n.includes('c++')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2z" fill="#00599C" opacity="0.15" />
        <path d="M12 3.5L3.5 8.2v7.6L12 20.5l8.5-4.7V8.2L12 3.5z" stroke="#00599C" strokeWidth="1.5" />
        <path
          d="M10.8 14.5c-.8.5-1.7.7-2.6.7-2.4 0-4-1.6-4-4.2s1.6-4.2 4-4.2c.9 0 1.8.2 2.6.7l-.7 1.4c-.6-.4-1.2-.5-1.9-.5-1.5 0-2.4 1-2.4 2.6s.9 2.6 2.4 2.6c.7 0 1.3-.2 1.9-.5l.7 1.4zm4.2-2.8v-1.4h-1.4V9h1.4V7.6h1.3V9h1.4v1.3h-1.4v1.4H15zm4.8 0v-1.4h-1.4V9h1.4V7.6h1.3V9h1.4v1.3h-1.4v1.4h-1.3z"
          fill="#659AD2"
        />
      </svg>
    );
  }

  // React / Next.js
  if (n.includes('react') || n.includes('next.js')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    );
  }

  // Spring Boot
  if (n.includes('spring')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M21 4.5c-4.5.3-9 2.5-12 6.5-2.2 2.9-3.2 6.5-2.8 10 .5-.2 1-.5 1.5-.8 3.5-2.2 5.8-5.8 6.5-9.8.2-.9.2-1.8.1-2.7 1.5-.7 3.2-1.1 4.9-1.2.7 0 1.3-.8 1.8-2z"
          fill="#6DB33F"
        />
        <path
          d="M8.2 18.2c-.3-.5-.6-1.1-.8-1.7-.5-1.5-.6-3.1-.3-4.6.4-1.8 1.3-3.4 2.5-4.8.4-.5.9-1 1.4-1.4-1.2.9-2.2 2.1-2.9 3.5-.8 1.6-1.1 3.4-.8 5.2.2 1.3.6 2.6 1.4 3.7.2.2.4.2-.5.1z"
          fill="#5B9834"
        />
      </svg>
    );
  }

  // Flask / FastAPI
  if (n.includes('flask') || n.includes('fastapi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 2v5.5L4.5 18c-.8 1.4.2 3.2 1.8 3.2h11.4c1.6 0 2.6-1.8 1.8-3.2L14 7.5V2" stroke="#009688" />
        <path d="M8.5 2h7" stroke="#009688" />
        <path d="M7 15h10" stroke="#009688" strokeDasharray="2 2" />
      </svg>
    );
  }

  // Node.js
  if (n.includes('node')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z"
          stroke="#68A063"
          strokeWidth="1.8"
          fill="#68A063"
          fillOpacity="0.15"
        />
        <path
          d="M12 6.5l5.2 3v6L12 18.5l-5.2-3v-6L12 6.5z"
          stroke="#68A063"
          strokeWidth="1.2"
        />
      </svg>
    );
  }

  // PostgreSQL
  if (n.includes('postgres')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3c-4.4 0-8 3.6-8 8 0 2.5 1.1 4.7 2.9 6.2l.6-1.5c-1.3-1.2-2.1-2.9-2.1-4.7 0-3.6 2.9-6.5 6.6-6.5s6.6 2.9 6.6 6.5c0 1.8-.8 3.5-2.1 4.7l.6 1.5c1.8-1.5 2.9-3.7 2.9-6.2 0-4.4-3.6-8-8-8z"
          fill="#336791"
        />
        <circle cx="12" cy="11" r="3.5" fill="#336791" />
      </svg>
    );
  }

  // REST APIs
  if (n.includes('rest') || n.includes('api')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="#38BDF8" />
        <path d="M7 12h10M13 8l4 4-4 4" stroke="#38BDF8" />
      </svg>
    );
  }

  // Postman
  if (n.includes('postman')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path
          d="M16.5 8.5L7 12.5l3.5 1.5 1.5 3.5 4.5-9z"
          fill="#FFFFFF"
        />
        <path
          d="M10.5 14l6-5.5-4 4.5-.5 2.5L10.5 14z"
          fill="#FFE2D7"
        />
      </svg>
    );
  }

  // ReadyAPI
  if (n.includes('readyapi')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
        <circle cx="12" cy="12" r="9" stroke="#10B981" />
        <path d="M12 7v5l3 3" stroke="#10B981" />
        <path d="M9 3h6" stroke="#10B981" />
      </svg>
    );
  }

  // Selenium WebDriver
  if (n.includes('selenium')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00B400" fillOpacity="0.2" stroke="#00B400" strokeWidth="1.5" />
        <text x="12" y="16" fill="#00B400" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          Se
        </text>
      </svg>
    );
  }

  // JUnit 5
  if (n.includes('junit')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#25A162" fillOpacity="0.15" stroke="#25A162" strokeWidth="1.5" />
        <path d="M7 12l3.5 3.5L17 8.5" stroke="#25A162" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Docker
  if (n.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M22.5 10.5c-.3-.2-1.5-.3-2.3.2-.2-1.1-.9-2.1-2-2.7l-.6-.3-.3.6c-.6 1.1-.6 2.3-.2 3.4-.6.3-1.8.4-2.8.2H2.5c-.4 1.7.1 3.8 1.4 5.3C5.7 19.3 8.7 20 12 20c7.2 0 10.5-4.4 10.8-8.5.5-.3.8-.7.7-1z"
          fill="#2496ED"
        />
        <rect x="6" y="8" width="2" height="2" fill="#2496ED" rx="0.3" />
        <rect x="9" y="8" width="2" height="2" fill="#2496ED" rx="0.3" />
        <rect x="12" y="8" width="2" height="2" fill="#2496ED" rx="0.3" />
        <rect x="9" y="5.5" width="2" height="2" fill="#2496ED" rx="0.3" />
        <rect x="12" y="5.5" width="2" height="2" fill="#2496ED" rx="0.3" />
        <rect x="15" y="8" width="2" height="2" fill="#2496ED" rx="0.3" />
      </svg>
    );
  }

  // Git / GitHub Actions
  if (n.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M21.7 10.9L13.1 2.3c-.4-.4-1-.4-1.4 0l-2 2 2.5 2.5c.4-.1.9 0 1.2.3.4.4.5 1 .3 1.5l2.4 2.4c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5L12.8 9.5v5.3c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.6.4-1.2.9-1.4V9.3c-.5-.2-.9-.8-.9-1.4 0-.4.1-.7.3-1L7.9 4.4 2.3 10c-.4.4-.4 1 0 1.4l8.6 8.6c.4.4 1 .4 1.4 0l9.4-9.4c.4-.3.4-.9 0-1.3z"
          fill="#F05032"
        />
      </svg>
    );
  }

  // Figma
  if (n.includes('figma')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M8 2.5a3.5 3.5 0 000 7h4v-7H8z" fill="#F24E1E" />
        <path d="M12 2.5h4a3.5 3.5 0 010 7h-4v-7z" fill="#FF7262" />
        <path d="M12 9.5h4a3.5 3.5 0 010 7h-4v-7z" fill="#1ABCFE" />
        <path d="M8 9.5a3.5 3.5 0 000 7h4v-7H8z" fill="#A259FF" />
        <path d="M8 16.5a3.5 3.5 0 003.5 3.5c1.9 0 3.5-1.6 3.5-3.5v-3.5H8v3.5z" fill="#0ACF83" />
      </svg>
    );
  }

  // Photoshop
  if (n.includes('photoshop')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="1.5" />
        <text x="12" y="16" fill="#31A8FF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          Ps
        </text>
      </svg>
    );
  }

  // Illustrator
  if (n.includes('illustrator')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#330000" stroke="#FF9A00" strokeWidth="1.5" />
        <text x="12" y="16" fill="#FF9A00" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          Ai
        </text>
      </svg>
    );
  }

  // UI / UX Wireframing / Fallback
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="#A78BFA" />
      <path d="M3 9h18M9 21V9" stroke="#A78BFA" />
    </svg>
  );
}
