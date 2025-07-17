'use client';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">💼 HR Dashboard</h1>
        <div className="flex gap-4 text-sm font-medium">
          <a href="/" className="hover:text-indigo-500">Home</a>
          <a href="/bookmarks" className="hover:text-indigo-500">Bookmarks</a>
          <a href="/analytics" className="hover:text-indigo-500">Analytics</a>
        </div>
      </div>
    </nav>
  );
}
