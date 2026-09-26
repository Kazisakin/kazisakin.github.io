import './globals.css';
import React from 'react';
import Header from './components/Header';
import SimpleFooter from './components/SimpleFooter';
import EditorialHeader from './components/editorial/EditorialHeader';
import EditorialFooter from './components/editorial/EditorialFooter';
import { THEME, DARK_MODE } from './config/theme';

export const metadata = {
  title: 'Kazi Mostofa Sakin — Developer, QA & Designer',
  description:
    'Portfolio of Kazi Mostofa Sakin, fourth-year Computer Science student at UNB. Full-stack development, QA and API testing, and design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const editorial = THEME === 'editorial';

  // Theme class is set on the server, so the page never flashes the wrong theme.
  const htmlClass = editorial ? 'theme-editorial' : DARK_MODE ? 'dark' : '';

  return (
    <html lang="en" className={htmlClass}>
      <body className="antialiased">
        <div className="relative z-10">
          {editorial ? <EditorialHeader /> : <Header />}
          <main>{children}</main>
          {editorial ? <EditorialFooter /> : <SimpleFooter />}
        </div>
      </body>
    </html>
  );
}
