'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070e21]/60 backdrop-blur-md shadow-lg shadow-indigo-200/20'
          : 'bg-[#070e21] shadow-lg shadow-indigo-200/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
  💼 HR Dashboard
</Link>
        <div className="flex gap-4 text-sm font-medium text-white">
          <a href="/" className="hover:text-indigo-400 transition-colors">Home</a>
          <a href="/bookmarks" className="hover:text-indigo-400 transition-colors">Bookmarks</a>
          <a href="/analytics" className="hover:text-indigo-400 transition-colors">Analytics</a>
        </div>
      </div>
    </nav>
  );
}
