import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eeeeff 0%, #e0e0f8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-60px', left: '-60px',
        width: '220px', height: '220px', borderRadius: '50%',
        background: 'rgba(99,82,220,0.18)', filter: 'blur(0px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'rgba(99,82,220,0.12)',
        pointerEvents: 'none',
      }} />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '28px', left: '28px',
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(99,82,220,0.2)',
          borderRadius: '50px',
          padding: '8px 16px',
          color: '#4A3DB5',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.95)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.7)'}
      >
        ← Back to Home
      </button>

      <LoginForm />

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default LoginPage;