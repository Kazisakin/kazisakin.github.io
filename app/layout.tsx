import './globals.css';
import React from 'react';
import Header from './components/Header';
import SimpleFooter from './components/SimpleFooter';
import EditorialHeader from './components/editorial/EditorialHeader';
import EditorialFooter from './components/editorial/EditorialFooter';
import KvHeader from './components/kv/KvHeader';
import KvFooter from './components/kv/KvFooter';
import KvTransition from './components/kv/KvTransition';
import { WIPE_SCRIPT } from './components/kv/wipeScript';
import { THEME, DARK_MODE } from './config/theme';

export const metadata = {
  metadataBase: new URL('https://kazisakin.github.io'),
  title: 'Kazi Mostofa Sakin — Software Engineer & QA Automation',
  description:
    'Portfolio of Kazi Mostofa Sakin, fourth-year Computer Science student at UNB. Full-stack software engineering, automated API testing, and applied machine learning.',
  keywords: [
    'Kazi Mostofa Sakin',
    'Software Engineer',
    'QA Automation',
    'API Testing',
    'Computer Science UNB',
    'Next.js',
    'Spring Boot',
    'Python',
    'Postman ReadyAPI',
  ],
  authors: [{ name: 'Kazi Mostofa Sakin', url: 'https://kazisakin.github.io' }],
  openGraph: {
    title: 'Kazi Mostofa Sakin — Software Engineer & QA Automation',
    description:
      'Computer Science student at UNB specializing in full-stack systems, automated testing, and secure software development.',
    url: 'https://kazisakin.github.io',
    siteName: 'Kazi Mostofa Sakin Portfolio',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kazi Mostofa Sakin — Software Engineer & QA Automation',
    description:
      'Computer Science student at UNB specializing in full-stack systems, automated testing, and secure software development.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const editorial = THEME === 'editorial';
  const kv = THEME === 'krishivet';

  // Theme class is set on the server, so the page never flashes the wrong theme.
  const htmlClass = kv ? 'theme-kv' : editorial ? 'theme-editorial' : DARK_MODE ? 'dark' : '';

  return (
    <html lang="en" className={htmlClass} data-theme={editorial ? 'field' : undefined} suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before the page paints, so it never flashes */}
        {!kv && (
        <script
          dangerouslySetInnerHTML={{
            __html: kv
              ? `try{if(localStorage.getItem('kv-theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`
              : `try{if(localStorage.getItem('ed-theme')==='dark')document.documentElement.removeAttribute('data-theme')}catch(e){}`,
          }}
        />
        )}
      </head>
      <body className="antialiased">
        <div className="relative z-10">
          {kv ? <KvHeader /> : editorial ? <EditorialHeader /> : <Header />}
          <main>{children}</main>
          {kv ? <KvFooter /> : editorial ? <EditorialFooter /> : <SimpleFooter />}
        </div>
        {kv && (
          <>
            <KvTransition />
            <script dangerouslySetInnerHTML={{ __html: WIPE_SCRIPT }} />
          </>
        )}
      </body>
    </html>
  );
}
