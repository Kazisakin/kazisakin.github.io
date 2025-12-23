import './globals.css';
import React from 'react';
import Header from './components/Header';
import SimpleFooter from './components/SimpleFooter';

export const metadata = {
  title: 'Kazi Mostofa Sakin - Computer Science Student',
  description: 'Portfolio of Kazi Mostofa Sakin, 4th year Computer Science student specializing in full-stack development, automation, and machine learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="bg-animated"></div>
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <SimpleFooter />
        </div>
      </body>
    </html>
  );
}
