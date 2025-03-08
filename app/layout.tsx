"use client"; // Ensure this is present for client-side hooks
import './globals.css';
import React, { useState, createContext, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CursorLight from './components/CursorLight';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Create a context to share sidebar state across Navbar & Sidebar
 */
interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  toggleSidebar: () => {},
});

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
          httpEquiv="Content-Security-Policy" // Changed from http-equiv to httpEquiv
          content="default-src 'self'; connect-src 'self' https://vitals.vercel-insights.com; script-src 'self' 'unsafe-inline' https://your-project.vercel.app/_vercel/*;"
        />
      </head>
      <body className="relative overflow-x-hidden">
        <SidebarContext.Provider value={contextValue}>
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
        </SidebarContext.Provider>
      </body>
    </html>
  );
}