import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../api/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(user ? (user.role === 'ROLE_ADMIN' ? '/admin' : '/dashboard') : '/')}>
        <span className="text-2xl">💰</span>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">FinanceTracker</span>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Welcome, <span className="font-semibold">{user.fullName}</span></span>
              {user.role === 'ROLE_ADMIN' ? (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Admin</span>
              ) : (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">User</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border-2 border-rose-500 text-rose-500 rounded-lg font-semibold hover:bg-rose-50 transition-all duration-200 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
