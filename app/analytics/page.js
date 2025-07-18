'use client';

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import departments from "../utils/departments";
import Navbar from "../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://dummyjson.com/users?limit=30");
      const data = await res.json();
      const processed = data.users.map((user) => ({
        ...user,
        department:
          departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      setUsers(processed);
    };
    fetchUsers();
  }, []);

  const getDeptAvgRatings = () => {
    const deptMap = {};
    users.forEach((user) => {
      if (!deptMap[user.department]) deptMap[user.department] = [];
      deptMap[user.department].push(user.rating);
    });

    const labels = Object.keys(deptMap);
    const data = labels.map(
      (dept) =>
        deptMap[dept].reduce((a, b) => a + b, 0) / deptMap[dept].length
    );

    return {
      labels,
      datasets: [
        {
          label: "🔥 Avg Ratings",
          data,
          backgroundColor: "rgba(236, 72, 153, 0.6)",
          borderRadius: 12,
        },
      ],
    };
  };

  const mockBookmarkTrend = () => {
    const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    const data = [5, 12, 8, 15];

    return {
      labels,
      datasets: [
        {
          label: "📈 Bookmarks",
          data,
          fill: false,
          borderColor: "#10b981",
          backgroundColor: "#34d399",
          tension: 0.4,
          pointRadius: 6,
        },
      ],
    };
  };

  return (
    <main className="min-h-screen px-6 pb-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-24 space-y-16">
        {/* 🪩 Intro Animation + Subtext */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-indigo-400 to-blue-400 text-transparent bg-clip-text animate-pulse">
            📊 Analytics-Team Performance Overview
          </h1>
          <p className="text-gray-400 text-sm italic">
           Track, analyze, grow. ✨✨
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* 🌟 Avg Ratings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 p-6 rounded-3xl shadow-xl backdrop-blur-xl border border-white/10 hover:shadow-pink-400/40 hover:scale-[1.04] transition-all duration-300 relative"
          >
            <h2 className="text-xl font-semibold mb-2 text-pink-400">
              🔥 Avg Dept Ratings
            </h2>
            <p className="text-xs text-gray-400 mb-4">Department Performance Overview 📡</p>
            <Bar data={getDeptAvgRatings()} />

            {/* ✨ Vibe Emoji */}
            <div className="absolute top-3 right-4 text-xl animate-bounce">💥</div>
          </motion.div>

          {/* 💾 Bookmark Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 p-6 rounded-3xl shadow-xl backdrop-blur-xl border border-white/10 hover:shadow-emerald-400/40 hover:scale-[1.04] transition-all duration-300 relative"
          >
            <h2 className="text-xl font-semibold mb-2 text-emerald-400">
              📌 Weekly Bookmark Heat
            </h2>
            <p className="text-xs text-gray-400 mb-4"> Trends to spot ✨ Bookmark ✨</p>
            <Line data={mockBookmarkTrend()} />

            {/* 🧃 Emoji Drama */}
            <div className="absolute bottom-3 right-4 text-xl animate-ping">📉</div>
          </motion.div>
        </div>

        {/* 🧠 Footer Quote */}
        <div className="text-center text-zinc-400 text-sm mt-10 italic">
          “Numbers don’t lie, but they do slay 👠”
        </div>
      </div>
    </main>
  );
}
