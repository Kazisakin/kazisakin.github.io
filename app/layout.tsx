"use client";
import './globals.css';
import React, { useState, createContext, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import CursorLight from './components/CursorLight';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

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

  // Optimize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ isOpen: sidebarOpen, toggleSidebar }), [sidebarOpen]);

  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <SidebarContext.Provider value={contextValue}>
          {/* Custom Cursor */}
          <CursorLight />

          {/* Navbar */}
          <Navbar />

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content with Smooth Scroll */}
          <motion.main
            className="pt-16 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.main>

          {/* Footer */}
          <Footer />

          {/* Subtle Overlay for Section Transitions */}
          <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-[#0a192f]/20 to-transparent z-20" />
          <Analytics />

        </SidebarContext.Provider>
      </body>
    </html>
  );
}