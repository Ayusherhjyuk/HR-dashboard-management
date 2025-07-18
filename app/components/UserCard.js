'use client';

import React, { useEffect, useState } from 'react';
import {
  Star,
  StarOff,
  Eye,
  Bookmark,
  BookmarkX,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UserCard({ user, onBookmark }) {
  const { firstName, lastName, email, age, department, rating } = user;
  const fullName = `${firstName} ${lastName}`;
  const router = useRouter();

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('bookmarkedUsers')) || [];
    setIsBookmarked(existing.some((u) => u.id === user.id));
  }, [user.id]);

  const toggleBookmark = () => {
    const existing = JSON.parse(localStorage.getItem('bookmarkedUsers')) || [];

    if (isBookmarked) {
      const updated = existing.filter((u) => u.id !== user.id);
      localStorage.setItem('bookmarkedUsers', JSON.stringify(updated));
    } else {
      const updated = [...existing, user];
      localStorage.setItem('bookmarkedUsers', JSON.stringify(updated));
    }

    setIsBookmarked(!isBookmarked);
    if (onBookmark) onBookmark();
  };

  const handlePromote = () => {
    toast.success(`${fullName} has been promoted! 🚀`, {
      description: 'They’re now one step closer to greatness.',
      duration: 4000,
    });
  };

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
          i < rating ? (
            <Star key={i} size={20} fill="currentColor" strokeWidth={1.5} />
          ) : (
            <StarOff key={i} size={20} strokeWidth={1.5} />
          )
        )}
      </div>

      <div className="flex justify-between mt-2 text-sm font-medium">
        <button
          onClick={() => router.push(`/employee/${user.id}`)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-800/40 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-500 transition"
        >
          <Eye size={16} /> View
        </button>

        <button
          onClick={toggleBookmark}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-800/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200 transition"
        >
          {isBookmarked ? (
            <>
              <BookmarkX size={16} /> Bookmarked
            </>
          ) : (
            <>
              <Bookmark size={16} /> Bookmark
            </>
          )}
        </button>

        <button
          onClick={handlePromote}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-800/40 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 transition"
        >
          <TrendingUp size={16} /> Promote
        </button>
      </div>
    </div>
  );
}
