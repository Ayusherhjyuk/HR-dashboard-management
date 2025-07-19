'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/'); 
    }
  }, [user, router]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.endsWith('@hr.com')) {
      login({ name: 'HR User', email });
      toast.success('Logged in successfully! 🎉');
      setTimeout(() => router.push('/'), 1000);
    } else {
      toast.error('Email must be from HR domain (e.g. name@hr.com) ❌');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0b1120] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 p-8 rounded-xl shadow-lg space-y-5 w-full max-w-md backdrop-blur-md border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center">🔐 Login to HR Dashboard</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-3 rounded bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/70 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all p-3 rounded font-semibold text-white shadow-md"
        >
          Login
        </button>

        <div className="text-sm text-white/70 text-center mt-2">
          Try <span className="font-bold text-white">admin@hr.com</span> / <span className="font-bold text-white">admin123</span>
        </div>
      </form>
    </div>
  );
}
