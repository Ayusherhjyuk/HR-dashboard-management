"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import Navbar from "./components/Navbar";
import departments from "./utils/departments";
import ratings from "./utils/ratings";
import { Input } from "./ui/input";

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // Fetch Users
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://dummyjson.com/users?limit=20");
      const data = res.data.users.map((user) => ({
        ...user,
        department:
          departments[Math.floor(Math.random() * departments.length)],
        rating: Math.floor(Math.random() * 5) + 1,
      }));
      setAllUsers(data);
      setFilteredUsers(data);
    };
    fetchData();
  }, []);

  // Filter Logic
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
  }, [searchTerm, selectedDepartment, selectedRating, allUsers]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f2937] to-[#111827] text-white px-6 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-16 space-y-10">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <svg
            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103 10.5a7.5 7.5 0 0013.15 6.15z"
            />
          </svg>
          <Input
            placeholder="Search name, email, or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-md"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Department Dropdown */}
          <div className="w-full sm:w-1/2">
            <label className="block mb-1 font-medium text-sm text-gray-300">
              Filter by Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full rounded-md px-4 py-2 bg-white text-black focus:ring-2 focus:ring-indigo-500 shadow-md"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Dropdown */}
          <div className="w-full sm:w-1/2">
            <label className="block mb-1 font-medium text-sm text-gray-300">
              Filter by Rating
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(Number(e.target.value))}
              className="w-full rounded-md px-4 py-2 bg-white text-black focus:ring-2 focus:ring-indigo-500 shadow-md"
            >
              <option value="">All Ratings</option>
              {ratings.map((rate) => (
                <option key={rate} value={rate}>
                  {rate} ⭐
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </main>
  );
}
