'use client';
import React from 'react';
import { Star, StarOff, Eye, Bookmark, TrendingUp } from 'lucide-react';

export default function UserCard({ user }) {
  const { firstName, lastName, email, age, department, rating } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="bg-gradient-to-br from-white/60 via-white/30 to-white/10 dark:from-gray-800/60 dark:to-gray-700/30 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl hover:shadow-indigo-400/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] w-full max-w-sm mx-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{fullName}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{email}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">Age: {age}</span>
          <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">Dept: {department}</span>
        </div>
      </div>

      <div className="flex items-center gap-[2px] mb-5 text-yellow-400 text-xl">
        {[...Array(5)].map((_, i) =>
          i < rating ? <Star key={i} size={20} fill="currentColor" strokeWidth={1.5} /> : <StarOff key={i} size={20} strokeWidth={1.5} />
        )}
      </div>

      <div className="flex justify-between mt-2 text-sm font-medium">
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-800/40 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-500 transition">
          <Eye size={16} /> View
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 transition">
          <Bookmark size={16} /> Bookmark
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 transition">
          <TrendingUp size={16} /> Promote
        </button>
      </div>
    </div>
  );
}
