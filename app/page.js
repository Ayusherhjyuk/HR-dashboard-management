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
  Star,
  PlusCircle,
  X
} from 'lucide-react';

export default function HomePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: '',
    rating: ''
  });

  const itemsPerPage = 9;

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

  const handleCreateUser = () => {
  const { firstName, lastName, email, age, department, rating } = newUser;
  if (!firstName || !lastName || !email || !age || !department || !rating) {
    return alert('Please fill all fields');
  }

  const createdUser = {
    ...newUser,
    id: Date.now(),
    age: Number(age),
    rating: Number(rating)
  };

  // 🧠 Save to localStorage
  const existing = JSON.parse(localStorage.getItem('createdUsers')) || [];
  const updatedLocal = [createdUser, ...existing];
  localStorage.setItem('createdUsers', JSON.stringify(updatedLocal));

  const updatedUsers = [createdUser, ...allUsers];
  setAllUsers(updatedUsers);
  setFilteredUsers(updatedUsers);
  setShowModal(false);
  setNewUser({ firstName: '', lastName: '', email: '', age: '', department: '', rating: '' });
};


  const FloatingIcon = ({ Icon, top, left, delay }) => (
    <motion.div
      className="absolute text-pink-300 z-1"
      initial={{ y: 0 }}
      animate={{ y: [0, -30, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ top, left, position: 'absolute', pointerEvents: 'none' }}
    >
      <Icon className="w-[60px] h-[60px] drop-shadow-2xl transition-all duration-500" />
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
            <p className="mt-6 text-2xl text-gray-300 animate-pulse">
              Loading HR Dashboard - FLAM Co.
            </p>
          </div>
        ) : (
          <>
            <FloatingIcon Icon={Sparkles} top="10%" left="78%" delay={0} />
            <FloatingIcon Icon={Users} top="25%" left="5%" delay={1} />
            <FloatingIcon Icon={Star} top="90%" left="75%" delay={2.2} />

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
                  <div className="relative lg:col-span-1 w-110">
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
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>

                    <select
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(Number(e.target.value))}
                      className="w-full md:w-1/3 rounded-xl px-4 py-2 bg-white/90 text-black font-medium shadow-inner focus:ring-2 focus:ring-yellow-400 hover:scale-105 transition-all duration-300"
                    >
                      <option value="">Ratings</option>
                      {ratings.map((rate) => (
                        <option key={rate} value={rate}>{rate} ⭐</option>
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
                >⬅️ Prev</button>
                <span className="text-white/70">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-1 text-sm rounded-md border border-white/20 hover:bg-white/10"
                >Next ➡️</button>
              </div>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-full shadow-lg text-xl z-50"
            >
              <PlusCircle className="inline-block w-6 h-6 mr-2" /> Create User
            </button>

            {showModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white text-black rounded-xl p-8 w-full max-w-md shadow-xl relative">
                  <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={() => setShowModal(false)}>
                    <X className="w-5 h-5" />
                  </button>

                  <h2 className="text-2xl font-bold mb-4">Create New User</h2>

                  <div className="space-y-4">
                    <Input placeholder="First Name" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                    <Input placeholder="Last Name" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                    <Input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    <Input placeholder="Age" type="number" value={newUser.age} onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} />

                    <select className="w-full p-2 rounded-md border" value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}>
                      <option value="">Select Department</option>
                      {departments.map((d) => (<option key={d} value={d}>{d}</option>))}
                    </select>

                    <select className="w-full p-2 rounded-md border" value={newUser.rating} onChange={(e) => setNewUser({ ...newUser, rating: e.target.value })}>
                      <option value="">Select Rating</option>
                      {ratings.map((r) => (<option key={r} value={r}>{r}</option>))}
                    </select>

                    <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600" onClick={handleCreateUser}>Add User</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
