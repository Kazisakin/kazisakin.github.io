"use client";
import { useEffect } from 'react';
import './globals.css';
import React, { useState, createContext, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CursorLight from './components/CursorLight';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  toggleSidebar: () => {},
});

function ClientContent({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force client-side reconciliation to handle DOM changes from extensions
  }, []);
  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const contextValue = useMemo(() => ({ isOpen: sidebarOpen, toggleSidebar }), [sidebarOpen]);

  return (
    <html lang="en">
      <head>
        <title>Your App Title</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; script-src 'self' 'unsafe-inline' https://your-project.vercel.app/_vercel/*;"
        />
      </head>
      <body className="relative overflow-x-hidden" suppressHydrationWarning>
        <SidebarContext.Provider value={contextValue}>
          <ClientContent>
            <Analytics />
            <SpeedInsights />
            <CursorLight />
            <Navbar />
            <Sidebar />
            <motion.main
              className="pt-16 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {children}
            </motion.main>
            <Footer />
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-[#0a192f]/20 to-transparent z-20" />
          </ClientContent>
        </SidebarContext.Provider>
      </body>
    </html>
  );
}