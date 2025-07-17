'use client';
import React from 'react';

export default function UserCard({ user }) {
  const { firstName, lastName, email, age, department, rating } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{fullName}</h2>
        <p className="text-gray-600 dark:text-gray-400">{email}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">Age: {age}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Dept: <span className="font-medium text-indigo-500">{department}</span>
        </p>
      </div>

      <div className="flex items-center gap-1 mb-3 text-yellow-400 text-lg">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < rating ? '⭐' : '☆'}</span>
        ))}
      </div>

      <div className="flex justify-between text-sm font-medium mt-2">
        <button className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200">View</button>
        <button className="px-3 py-1 rounded bg-amber-100 text-amber-700 hover:bg-amber-200">Bookmark</button>
        <button className="px-3 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Promote</button>
      </div>
    </div>
  );
}
