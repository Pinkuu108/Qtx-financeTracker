import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'ROLE_ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  if (!user.active && window.location.pathname !== '/inactive') {
    return <Navigate to="/inactive" replace />;
  }

  if (user.active && window.location.pathname === '/inactive') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
