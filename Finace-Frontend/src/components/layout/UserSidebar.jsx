import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../api/auth';

const UserSidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { id: 'home', label: 'Dashboard', icon: '🏠', path: '/dashboard/home' },
    { id: 'add', label: 'Add Transaction', icon: '➕', path: '/dashboard/add' },
    { id: 'transactions', label: 'Transactions', icon: '📋', path: '/dashboard/transactions' },
    {
      id: 'budget',
      label: 'Budget',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7zm2 0v10h12V7H6zm2 2h8v2H8V9zm0 4h5v2H8v-2z" />
        </svg>
      ),
      path: '/dashboard/budget',
    },
  ];

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
    <div className="bg-linear-to-b from-teal-900 to-cyan-900 text-white h-screen flex flex-col" style={{ width: '256px' }}>
      {/* Logo Section */}
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">💰</span>
            <span className="text-base font-bold text-white">FinanceTracker</span>
          </div>
          <p className="text-teal-300 text-xs">Personal Finance</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm ${
                  isActive
                    ? 'bg-white text-teal-700 font-semibold shadow-md'
                    : 'text-teal-200 hover:bg-teal-800'
                }`
              }
              onClick={onClose}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section - User Info & Logout */}
      <div className="mt-auto p-4 border-t border-teal-800">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center font-bold text-sm text-white">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.fullName || 'User'}</p>
              <p className="text-xs text-teal-300">Personal Account</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 bg-linear-to-r from-orange-500 to-rose-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
