import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getAllRequests, activateRequest, ignoreRequest } from '../../api/requests';
import { getUsers } from '../../api/admin';
import Spinner from '../ui/Spinner';

const ActivationRequests = () => {
  const { onRequestUpdate } = useOutletContext();
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [requestsRes, usersRes] = await Promise.all([
        getAllRequests(),
        getUsers()
      ]);
      const requestsData = Array.isArray(requestsRes.data) ? requestsRes.data : [];
      const usersData = Array.isArray(usersRes.data) ? usersRes.data : [];
      
      // Console log to see request structure
      if (requestsData.length > 0) {
        console.log('Sample request object:', requestsData[0]);
      }
      
      setRequests(requestsData);
      setUsers(usersData);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to fetch requests';
      setError(errorMessage);
      setRequests([]);
      setUsers([]);
      console.error('Fetch data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = (request) => {
    // Check if request object has user info directly
    if (request.userName || request.fullName) {
      return {
        name: request.userName || request.fullName,
        email: request.userEmail || request.email || 'No email provided'
      };
    }
    
    // Otherwise find user from users list
    const user = users.find(u => u.id === request.userId);
    if (user) {
      return {
        name: user.fullName || 'Unknown User',
        email: user.email || 'No email provided'
      };
    }
    
    // Fallback
    return {
      name: `User #${request.userId}`,
      email: 'No email provided'
    };
  };

  const handleActivate = async (id) => {
    setError('');
    setSuccess('');
    try {
      await activateRequest(id);
      setSuccess('Request activated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      await fetchData();
      onRequestUpdate();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to activate request. Please try again.';
      setError(errorMessage);
      console.error('Activate error:', err);
    }
  };

  const handleIgnore = async (id) => {
    setError('');
    setSuccess('');
    try {
      await ignoreRequest(id);
      setSuccess('Request ignored successfully!');
      setTimeout(() => setSuccess(''), 3000);
      await fetchData();
      onRequestUpdate();
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data || 'Failed to ignore request. Please try again.';
      setError(errorMessage);
      console.error('Ignore error:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>📋</span> Activation Requests
      </h2>

      {error && (
        <div className="mb-3 p-3 bg-rose-50 border-2 border-rose-200 rounded-lg text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-3 p-3 bg-emerald-50 border-2 border-emerald-200 rounded-lg text-emerald-600 text-xs font-medium">
          {success}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No pending requests</h3>
          <p className="text-sm text-gray-500">All activation requests have been processed</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => {
            const userInfo = getUserInfo(request);
            return (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 p-4 border-2 border-gray-100 hover:border-indigo-200"
              >
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  {/* User Avatar with first letter of name */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <h3 className="text-sm font-bold text-gray-900 mb-0.5">{userInfo.name}</h3>
                      <p className="text-xs text-gray-500 break-all">{userInfo.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                    </div>
                    
                    {/* User Message */}
                    <div className="bg-indigo-50 rounded-lg p-3 mb-2 border border-indigo-100">
                      <p className="text-gray-700 italic text-xs leading-relaxed">
                        "{request.message}"
                      </p>
                    </div>

                    {/* Request Date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span>📅</span>
                      <span>Requested on {formatDate(request.createdAt)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => handleActivate(request.id)}
                      className="flex-1 sm:flex-none px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-md">
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleIgnore(request.id)}
                      className="flex-1 sm:flex-none px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105">
                      ❌ Ignore
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActivationRequests;