'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import { motion } from 'framer-motion';
import { Sparkles, Ghost, Megaphone, Quote } from 'lucide-react';
import { toast } from 'sonner';

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 120 },
  },
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedUsers');
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = bookmarks.filter((user) => user.id !== id);
    setBookmarks(updated);
    localStorage.setItem('bookmarkedUsers', JSON.stringify(updated));
    toast.error(`💔 User #${id} yeeted from your favs`);
  };

  const handlePromote = (id) => {
    toast.success(`🛸 User #${id} launched to the moon!`);
  };

  const handleAssign = (id) => {
    toast(`🧃 User #${id} is now running a vibe check on a new task!`, {
      description: 'Check Project > Team tab to catch the wave 🌊',
      action: {
        label: 'Open',
        onClick: () => console.log('Clicked View'),
      },
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white px-6 pb-20 font-mono">
      <Navbar />

      <motion.div
        className="max-w-7xl mx-auto mt-20 space-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        <motion.div
          className="text-center"
          variants={itemVariant}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 80 }}
        >
          <motion.h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
            Legendary Bookmarks
          </motion.h1>
          <p className="mt-3 text-lg text-gray-300 italic max-w-xl mx-auto">
            💾 "The GOATs don’t wait – save ‘em or regret later." 🐐
          </p>
        </motion.div>

        {bookmarks.length === 0 ? (
          <motion.div
            className="relative text-center mt-16 p-10 bg-white/5 rounded-3xl shadow-2xl backdrop-blur-lg border border-white/10 max-w-2xl mx-auto"
            variants={itemVariant}
            animate={{
              y: [0, -5, 0],
              transition: { repeat: Infinity, duration: 2.4 },
            }}
          >
            <Ghost className="mx-auto w-14 h-14 text-pink-400 mb-4 animate-bounce" />
            <p className="text-3xl font-bold mb-2 tracking-tight text-white">
              Uh-oh... nobody here yet 😶‍🌫️
            </p>
            <p className="text-sm text-gray-400 mb-4">
              This space is emptier than your DMs 🫠
            </p>
            <div className="flex justify-center items-center text-xs text-amber-300 gap-2 italic mt-4">
              <Quote size={16} />
              “Start saving legends before the algorithm hides them forever.”
            </div>
          </motion.div>
        ) : (
          <>
            <motion.p
              className="text-center text-gray-400 text-sm"
              variants={itemVariant}
            >
              You’ve saved{' '}
              <span className="text-yellow-300 font-bold">{bookmarks.length}</span>{' '}
              elite employee{bookmarks.length > 1 ? 's' : ''}. Certified bangers. 💯
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              variants={containerVariant}
            >
              {bookmarks.map((user) => (
                <motion.div
                  key={user.id}
                  className="bg-white/10 p-5 rounded-2xl shadow-md hover:shadow-pink-500/40 backdrop-blur transform transition-all duration-300 hover:scale-105 border border-white/5"
                  variants={itemVariant}
                >
                  <UserCard user={user} onBookmark={() => handleRemove(user.id)} />

                  <div className="flex gap-3 mt-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePromote(user.id)}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-tr from-green-400 to-green-600 text-white hover:brightness-110 font-bold text-sm shadow"
                    >
                      🚀 Promote
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAssign(user.id)}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-tr from-blue-400 to-blue-600 text-white hover:brightness-110 font-bold text-sm shadow"
                    >
                      🧠 Assign
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </main>
  );
}
