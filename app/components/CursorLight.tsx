'use client';
import React, { useEffect, useState } from 'react';

export default function CursorLight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-50">
      {/* Outer Glow */}
      <div
        className="absolute w-24 h-24 bg-[#64ffda] opacity-10 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translate(${position.x - 48}px, ${position.y - 48}px)` }}
      />
      {/* Middle Glow */}
      <div
        className="absolute w-16 h-16 bg-[#64ffda] opacity-20 rounded-full blur-2xl"
        style={{ transform: `translate(${position.x - 32}px, ${position.y - 32}px)` }}
      />
      {/* Inner Circle */}
      <div
        className="absolute w-6 h-6 bg-[#64ffda] opacity-80 rounded-full"
        style={{ transform: `translate(${position.x - 12}px, ${position.y - 12}px)` }}
      />
    </div>
  );
}
