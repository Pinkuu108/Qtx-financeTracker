import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center px-4 relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-1.5 text-white font-semibold hover:text-indigo-200 transition-all duration-200 text-sm"
      >
        <span>←</span>
        <span>Back to Home</span>
      </button>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
