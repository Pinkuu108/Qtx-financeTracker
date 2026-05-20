import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sendActivationRequest } from '../api/requests';
import Navbar from '../components/layout/Navbar';

const InactivePage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSendRequest = async () => {
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await sendActivationRequest({
        userId: parseInt(user.userId),
        message: message,
      });
      setSuccess(true);
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Pending Activation
              </h2>
              <p className="text-gray-600">
                Please wait for admin approval or send an activation request.
              </p>
            </div>

            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-amber-800 text-sm">
                ⚠️ Your account is currently inactive. An admin needs to review and activate your account before you can start tracking transactions.
              </p>
            </div>

            {success ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-center mb-4">
                ✅ Request sent successfully! Please wait for admin approval.
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Admin
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Why should your account be activated?"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={handleSendRequest}
                  disabled={loading || !message.trim()}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-60 mb-3"
                >
                  {loading ? 'Sending...' : 'Send Activation Request'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InactivePage;
