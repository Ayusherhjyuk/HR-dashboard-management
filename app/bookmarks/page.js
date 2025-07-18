'use client';

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedUsers");
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = bookmarks.filter(user => user.id !== id);
    setBookmarks(updated);
    localStorage.setItem("bookmarkedUsers", JSON.stringify(updated));
  };

  const handlePromote = (id) => {
    alert(`User ${id} promoted (mock action)`);
  };

  const handleAssign = (id) => {
    alert(`User ${id} assigned to a project (mock action)`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] text-white px-6 pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-20 space-y-10">
        <h2 className="text-3xl font-bold">📌 Bookmarked Employees</h2>
        {bookmarks.length === 0 ? (
          <p>No bookmarks yet!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bookmarks.map(user => (
              <div key={user.id}>
                <UserCard user={user} onBookmark={() => handleRemove(user.id)} />
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handlePromote(user.id)}
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Promote
                  </button>
                  <button
                    onClick={() => handleAssign(user.id)}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Assign to Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
