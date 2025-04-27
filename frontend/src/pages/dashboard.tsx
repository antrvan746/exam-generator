import { useRouter } from 'next/router';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from '../contexts/ToastContext';
import Loading from '../components/Loading';

export default function Dashboard() {
  const { user, loading, logout } = useAuthStore();
  const { addToast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      addToast('Logged out successfully', 'success');
      router.push('/login');
    } catch (error) {
      addToast('Failed to logout', 'error');
    }
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome, {user.firstName} {user.lastName}!
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 