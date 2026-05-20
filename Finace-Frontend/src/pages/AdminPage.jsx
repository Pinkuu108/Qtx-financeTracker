import { useEffect, useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getRequestCount, getAllRequests } from '../api/requests';
import { getUsers } from '../api/admin';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/auth';
import Sidebar from '../components/layout/Sidebar';
import Spinner from '../components/ui/Spinner';

const AdminPage = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchDashboardData();
    fetchPendingCount();
    const interval = setInterval(() => {
      fetchRequestCount();
      fetchPendingCount();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [requestRes, usersRes] = await Promise.all([
        getRequestCount(),
        getUsers()
      ]);
      setRequestCount(requestRes.data.count);
      setUsers(usersRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCount = async () => {
    try {
      const response = await getAllRequests();
      const requests = Array.isArray(response.data) ? response.data : [];
      const pending = requests.filter(req => req.status === 'PENDING' || !req.status).length;
      setPendingCount(pending);
    } catch (err) {
      console.error('Failed to fetch pending count:', err);
    }
  };

  const fetchRequestCount = async () => {
    try {
      const response = await getRequestCount();
      setRequestCount(response.data.count);
    } catch (err) {
      console.error('Failed to fetch request count:', err);
    }
  };

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

  const handleViewRequests = () => {
    setShowNotifications(false);
    navigate('/admin/requests');
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.active).length;
  const inactiveUsers = totalUsers - activeUsers;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: '👥',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: '✅',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Inactive Users',
      value: inactiveUsers,
      icon: '⏸️',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      title: 'Pending Requests',
      value: requestCount,
      icon: '📋',
      gradient: 'from-orange-500 to-amber-600'
    }
  ];

  return (
    <div className="h-screen overflow-hidden">
      {/* Sidebar - Fixed on desktop, slide-in on mobile */}
      <div 
        className={`fixed left-0 top-0 h-screen z-40 transition-transform duration-300 ${
          isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`} 
        style={{ width: '256px' }}
      >
        <Sidebar requestCount={requestCount} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content wrapper */}
      <div 
        className="flex flex-col bg-slate-50 h-screen"
        style={!isMobile ? { marginLeft: '256px' } : {}}
      >
        {/* Navbar */}
        <div className="z-20 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between flex-shrink-0 px-4" style={{ height: '48px' }}>
          {/* Left side - Hamburger + Dashboard title */}
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-800 text-xl hover:bg-gray-100 p-1.5 rounded-lg transition-all"
              >
                ☰
              </button>
            )}
            <h1 className="text-base md:text-lg font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          
          {/* Right side - Welcome message, Notification Bell, and Logout button */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xs md:text-sm text-gray-600 hidden sm:block">
              Welcome, <span className="font-semibold text-indigo-700">{user?.fullName || 'Admin'}</span>
            </span>
            
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              >
                <span className="text-lg">🔔</span>
                {pendingCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {pendingCount > 9 ? '9+' : pendingCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-10 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                    Pending Requests 🔔
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">
                    {pendingCount} activation {pendingCount === 1 ? 'request' : 'requests'} waiting for approval
                  </p>
                  <button
                    onClick={handleViewRequests}
                    className="w-full text-teal-600 font-semibold hover:text-teal-800 transition-all duration-200 text-xs flex items-center justify-center gap-1"
                  >
                    View All Requests →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all duration-200 text-xs md:text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="bg-slate-50" style={{ height: 'calc(100vh - 48px)', overflowY: 'auto' }}>
          <div className="p-4 md:p-5">
            {/* Dashboard Stats Cards */}
            {loading ? (
              <div className="flex justify-center py-12 mb-6">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg p-4 text-white hover:scale-105 transition-transform duration-200 cursor-pointer relative`}
                  >
                    <div className="absolute top-3 right-3 text-3xl opacity-80">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-white/80">{stat.title}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Nested Route Content */}
            <Outlet context={{ onRequestUpdate: fetchRequestCount }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
