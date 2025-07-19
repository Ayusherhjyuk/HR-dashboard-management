'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Star, StarOff } from 'lucide-react';
import axios from 'axios';
import { feedbackByDepartment } from '@/app/data/feedbackData'; // ⬅️ top of your file
import projectData from '@/app/data/projectData';

import Navbar from '@/app/components/Navbar';

const getRandomBio = () => [
  '🚀 Passionate about building user-friendly interfaces.',
  '🎨 Focused on performance, accessibility, and design.',
  '📚 A lifelong learner and open-source contributor.',
  '💡 Loves solving real-world problems with code.',
  '🎯 Driven to build pixel-perfect web apps.',
][Math.floor(Math.random() * 5)];

const getMockHistory = () => {
  return Array.from({ length: 5 }).map((_, i) => {
    const score = Math.floor(Math.random() * 41) + 60; // 60-100
    const status =
      score > 85 ? '🌟 Very Good' : score > 70 ? '👍 Good' : score > 60 ? '👌 Average' : '⚠️ Needs Improvement';
    return {
      year: 2019 + i,
      status,
      score,
    };
  });
};

const getMockProjects = (department) => {
  const deptProjects = projectData[department] || [];
  const shuffled = [...deptProjects].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2); // pick 2 random projects
};

const getRandomName = () => [
  'Riya Sen',
  'Karan Mehta',
  'Simran Gupta',
  'Aryan Patel',
  'Sneha Kapoor',
  'Jay Verma',
][Math.floor(Math.random() * 6)];

const getRandomDate = () => {
  const date = new Date(
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
  );
  return date.toLocaleDateString();
};

const getMockFeedback = (department) => {
  const pool = feedbackByDepartment[department] || ["📋 No feedback available."];
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return Array.from({ length: 3 }).map(() => ({
    message: shuffled[Math.floor(Math.random() * shuffled.length)],
    name: getRandomName(),
    date: getRandomDate(),
  }));
};
const getRandomDepartment = () => {
  const departments = ['Engineering', 'HR', 'Design', 'Sales', 'Marketing'];
  return departments[Math.floor(Math.random() * departments.length)];
};



export default function EmployeeDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      // Check localStorage first
      const localUsers = JSON.parse(localStorage.getItem("createdUsers")) || [];
      const localUser = localUsers.find((u) => String(u.id) === String(id));

      if (localUser) {
        // Add mock data like you do for API
        localUser.department ||= getRandomDepartment();
        localUser.feedback = getMockFeedback(localUser.department);
        localUser.rating = Math.floor(Math.random() * 5) + 1;
        localUser.bio = getRandomBio();
        localUser.history = getMockHistory();
        localUser.projects = getMockProjects(localUser.department);

        setUser(localUser);
        return;
      }

      // Not in localStorage? Try API
      const res = await axios.get(`https://dummyjson.com/users/${id}`);
      const userData = res.data;

      // Add your fake props here too
      userData.department = getRandomDepartment();
      userData.feedback = getMockFeedback(userData.department);
      userData.rating = Math.floor(Math.random() * 5) + 1;
      userData.bio = getRandomBio();
      userData.history = getMockHistory();
      userData.projects = getMockProjects(userData.department);

      setUser(userData);
    } catch (err) {
      console.error('User not found ❌', err);
      setUser({ notFound: true });
    }
  };

  fetchUser();
}, [id]);

   if (user?.notFound) {
  return (
    <main className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">User Not Found 😵</h1>
        <p className="mt-2 text-gray-400">Try going back to the employee list.</p>
      </div>
    </main>
  );
}

  if (!user) return <div className="text-white p-10">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-30 px-6 py-8">
        <div className="bg-white/10 p-6 rounded-xl shadow-2xl backdrop-blur-md border border-white/10">
          <h1 className="text-3xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
          <p className="text-sm text-gray-300 mb-4">{user.email}</p>

          <div className="flex flex-wrap gap-4 text-sm mb-4">
            <span className="bg-indigo-800/40 px-3 py-1 rounded-full">Department: {user.department}</span>
            <span className="bg-green-700/40 px-3 py-1 rounded-full">Phone: {user.phone}</span>
            <span className="bg-purple-700/40 px-3 py-1 rounded-full">Age: {user.age}</span>
          </div>

          <p className="mb-4 italic">{user.bio}</p>

          <div className="flex items-center gap-[2px] text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) =>
              i < user.rating
                ? <Star key={i} size={20} fill="currentColor" strokeWidth={1.5} />
                : <StarOff key={i} size={20} strokeWidth={1.5} />
            )}
          </div>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="bg-slate-700/30 rounded-xl mb-4 shadow-md backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

        
           <TabsContent value="overview">
  <Card className="bg-white/5 hover:scale-[1.01] transition-all duration-300 shadow-inner rounded-xl">
    <CardContent className="p-4 space-y-3">
      <h2 className="text-xl font-semibold mb-4">📌 Experience Summary</h2>

      <div className="relative pl-8 border-l-2 border-indigo-500">
        {(() => {
          const rolesByDept = {
            Engineering: ['Frontend Intern', 'Backend Developer', 'Full Stack Dev', 'System Architect', 'Tech Lead'],
            HR: ['HR Intern', 'Recruitment Executive', 'Talent Manager', 'HRBP', 'People Ops Lead'],
            Design: ['UI Intern', 'UX Designer', 'Product Designer', 'Design Strategist', 'Creative Director'],
            Sales: ['Sales Trainee', 'Account Exec', 'Sales Manager', 'Regional Head', 'Sales Director'],
            Marketing: ['SEO Intern', 'Content Creator', 'Brand Strategist', 'Campaign Manager', 'Marketing Head'],
          };

          const randomCompanies = [
            'Google', 'Microsoft', 'Amazon', 'Netflix', 'Meta',
            'Salesforce', 'Adobe', 'Zomato', 'Paytm', 'Infosys',
            'Swiggy', 'TCS', 'CRED', 'Flipkart', 'Meesho',
          ];

          // Start from the current year
          let currentYear = new Date().getFullYear();

          return user.history
            .slice()
            .reverse()
            .map((item, index) => {
              const deptRoles = rolesByDept[user.department] || ['Team Member'];
              const reversedIndex = user.history.length - 1 - index;
              const role = deptRoles[reversedIndex] || 'Associate';

              const duration = Math.floor(Math.random() * 3) + 1; // 1 to 3 years
              const startYear = currentYear - duration;
              const endYear = currentYear;

              currentYear = startYear; // Update for next iteration

              const company = randomCompanies[Math.floor(Math.random() * randomCompanies.length)];

              return (
                <div key={index} className="relative mb-8 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-3 w-6 h-6 bg-indigo-600 rounded-full border-4 border-indigo-300" />

                  {/* Line */}
                  {index < user.history.length - 1 && (
                    <div className="absolute left-0 top-6 w-0.5 h-full bg-indigo-500 z-0" />
                  )}

                  {/* Experience Card */}
                  <div className="bg-gray-800/60 p-4 rounded-lg border border-white/10">
                    <h3 className="text-white font-bold text-lg">
                      {startYear} - {endYear} · {role} at {company}{' '}
                      <span className="text-sm text-gray-400">
                        ({duration} {duration === 1 ? 'year' : 'years'})
                      </span>
                    </h3>
                    <p className="text-gray-200 text-sm mt-1">
                      Worked as a {role.toLowerCase()} contributing to impactful projects, collaborating with cross-functional teams, and refining skills in the {user.department.toLowerCase()} domain.
                    </p>
                  </div>
                </div>
              );
            });
        })()}
      </div>
    </CardContent>
  </Card>
</TabsContent>



            <TabsContent value="projects">
  <Card className="bg-white/5 hover:scale-[1.01] transition-all duration-300 shadow-inner rounded-xl">
    <CardContent className="p-4 space-y-4">
      {user.projects.map((project, i) => (
        <div
          key={i}
          className="bg-gray-800/80 p-5 rounded-xl border border-white/10 shadow-sm hover:shadow-md hover:bg-gray-700/80 transition-all space-y-2"
        >
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
          <p className="text-sm text-gray-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-indigo-300">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-indigo-500/20 px-2 py-1 rounded-full text-indigo-200"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 text-sm mt-2">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              🔗 Live
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              💻 GitHub
            </a>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
</TabsContent>


            <TabsContent value="feedback">
              <Card className="bg-white/5 hover:scale-[1.01] transition-all duration-300 shadow-inner rounded-xl">
                <CardContent className="p-4 space-y-4">
                  {user.feedback.map((fb, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/80 p-4 rounded-lg border border-white/10 hover:shadow-md hover:translate-y-[-2px] transition-all"
                    >
                      <p className="text-sm italic mb-2 text-gray-200">{fb.message}</p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>— {fb.name}</span>
                        <span>{fb.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
