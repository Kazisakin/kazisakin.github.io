'use client';
import React from 'react';

export default function SimpleFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 sm:py-10 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} Kazi Mostofa Sakin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
