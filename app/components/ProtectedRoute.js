// components/ProtectedRoute.js
'use client';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, pathname]);

  if (!user && pathname !== '/login') return null;

  return children;
}
