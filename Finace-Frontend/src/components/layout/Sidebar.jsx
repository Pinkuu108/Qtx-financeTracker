import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ requestCount, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const tabs = [
    { id: 'users', label: 'Users', icon: '👥', path: '/admin/users' },
    { id: 'categories', label: 'Categories', icon: '📁', path: '/admin/categories' },
    { id: 'requests', label: 'Requests', icon: '📋', badge: requestCount, path: '/admin/requests' },
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
    <div className="bg-indigo-900 text-white w-64 min-h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">💰</span>
            <span className="text-base font-bold text-white">FinanceTracker</span>
          </div>
        <hr ></hr>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-indigo-900 font-semibold shadow-md'
                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`
              }
              onClick={onClose}
            >
              <span className="flex items-center gap-2 text-sm">
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
              {tab.badge > 0 && (
                <span className="bg-rose-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {tab.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Admin Info & Logout */}
      <div className="mt-auto p-4 border-t border-indigo-800">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-sm">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-indigo-300">Administrator</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold transition-all duration-200 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
