import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

export default function Home() {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return <Loading />;
} 