'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './components/UserCard';
import Navbar from './components/Navbar';

import departments from './utils/departments';
import ratings from './utils/ratings';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import {
  Flame,
  Search,
  Rocket,
  Sparkles,
  Users,
  Building,
  Briefcase,
  Star,
  Award,
  Lightbulb
} from 'lucide-react';

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://dummyjson.com/users?limit=100');
      const data = res.data.users.map((user) => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      setAllUsers(data);
      setFilteredUsers(data);
      setTimeout(() => setLoading(false), 1500);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allUsers.filter((user) => {
      const name = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const department = user.department.toLowerCase();

      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        department.includes(searchTerm.toLowerCase());

      const matchesDepartment =
        !selectedDepartment || user.department === selectedDepartment;

      const matchesRating = !selectedRating || user.rating === selectedRating;

      return matchesSearch && matchesDepartment && matchesRating;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedRating, allUsers]);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 🔮 Floating Background Icon Component
 // 🔮 Floating Background Icon Component (BIG + Noticeable)
const FloatingIcon = ({ Icon, top, left, delay }) => (
  <motion.div
    className="absolute text-pink-300 z-1"
    initial={{ y: 0 }}
    animate={{ y: [0, -30, 0] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
    style={{
      top,
      left,
      position: 'absolute',
      pointerEvents: 'none',
    }}
  >
    <Icon
      className="w-[60px] h-[60px]  drop-shadow-2xl transition-all duration-500"
    />
  </motion.div>
);


  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white px-6 pb-20 overflow-hidden relative">
      <Navbar />

      
      

      {loading ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="text-pink-500 text-6xl"
          >
            <Rocket />
          </motion.div>
          <p className="mt-6 text-2xl text-gray-300 animate-pulse">Loading HR Dashboard - FLAM Co.</p>
        </div>
      ) : (
        <>

         {/* 🎉 Floating Icons now load AFTER rocket */}
    <FloatingIcon Icon={Sparkles} top="10%" left="78%" delay={0} />
    <FloatingIcon Icon={Users} top="25%" left="5%" delay={1} />
    <FloatingIcon Icon={Star} top="90%" left="75%" delay={2.2} />

    {/* 🌟 Now your main dashboard content starts */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto mt-30 text-center space-y-4 mb-10 z-10 relative"
    ></motion.div>
        
          <motion.div
          
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-30 text-center space-y-4 mb-10 z-10 relative"
          >
            <h1 className="text-6xl font-extrabold tracking-tight text-white flex justify-center items-center gap-4">
              <Flame className="text-pink-500 animate-flicker w-8 h-8" /> HR Talent Dashboard
            </h1>
            <p className="text-gray-300 text-2xl font-light max-w-2xl mx-auto">
              Empower your HR journey. Discover exceptional candidates and manage talent efficiently with <span className="text-pink-400 font-semibold">FLAM</span> Co. 💼✨
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-12 relative z-10"
          >
            <div className="relative bg-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 overflow-hidden group transition-all duration-500 ease-in-out">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-float1 group-hover:blur-xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-float2 group-hover:blur-xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                <div className="relative lg:col-span-1  w-110">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search name, email, or department"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg font-medium rounded-xl bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-500 focus:outline-none shadow-xl hover:scale-[1.01] transition-all duration-300"
                  />
                </div>

                <div className="flex lg:col-span-2 flex-col md:flex-row justify-end gap-4 w-full">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full md:w-1/3 rounded-xl px-4 py-2 bg-white/90 text-black font-medium shadow-inner focus:ring-2 focus:ring-blue-400 hover:scale-105 transition-all duration-300"
                  >
                    <option value="">Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                    className="w-full md:w-1/3 rounded-xl px-4 py-2 bg-white/90 text-black font-medium shadow-inner focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-300"
                  >
                    <option value="">Ratings</option>
                    {ratings.map((rate) => (
                      <option key={rate} value={rate}>
                        {rate} ⭐
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-10 px-4 relative z-10"
          >
            {paginatedUsers.map((user, idx) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                whileHover={{ scale: 1.03, rotate: [0, 1, -1, 0] }}
              >
                <UserCard user={user} advanced />
              </motion.div>
            ))}
          </motion.div>

          {filteredUsers.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-2 mt-10 z-10 relative">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-1 text-sm rounded-md border border-white/20 hover:bg-white/10"
              >
                ⬅️ Prev
              </button>
              <span className="text-white/70">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-1 text-sm rounded-md border border-white/20 hover:bg-white/10"
              >
                Next ➡️
              </button>
            </div>
          )}
        </>
      )}
    </main>
    </ProtectedRoute>
  );
}
