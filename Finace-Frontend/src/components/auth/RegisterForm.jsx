import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';

const EyeIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const FIELDS = ['fullName', 'email', 'password', 'confirmPassword'];

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focused, setFocused] = useState(null);
  const [success, setSuccess] = useState(false);

  const filledCount = FIELDS.filter(f => formData[f].length > 0).length;
  const progressPct = (filledCount / FIELDS.length) * 100;

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strengthScore];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strengthScore];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Enter a valid email';
    if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const { confirmPassword, ...payload } = formData;
      const response = await registerUser(payload);
      if (response.data === 'Registration Successful') {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setErrors({ general: response.data });
      }
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const inputBase = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    padding: '10px 14px',
    fontSize: '14px',
    color: '#e8e8f0',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.01em',
  };

  const inputFocused = {
    borderColor: '#c9a84c',
    background: 'rgba(201,168,76,0.06)',
    boxShadow: '0 0 0 3px rgba(201,168,76,0.08)',
  };

  const inputError = {
    borderColor: '#ef4444',
    background: 'rgba(239,68,68,0.05)',
  };

  const getInputStyle = (name) => ({
    ...inputBase,
    ...(focused === name ? inputFocused : {}),
    ...(errors[name] ? inputError : {}),
  });

  if (success) {
    return (
      <div style={{
        background: 'rgba(15,15,19,0.95)',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '16px',
        padding: '48px 40px',
        textAlign: 'center',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 24,
        }}>✓</div>
        <p style={{ color: '#e8e8f0', fontFamily: "'DM Sans', sans-serif", fontSize: 16 }}>Account created!</p>
        <p style={{ color: '#5a5a6e', fontFamily: "'DM Sans', sans-serif", fontSize: 13, marginTop: 6 }}>Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>

        {/* Progress sidebar */}
        <div style={{
          width: 4,
          borderRadius: '4px 0 0 4px',
          background: 'rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: `${progressPct}%`,
            background: 'linear-gradient(to top, #c9a84c, #e8c97a)',
            transition: 'height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            borderRadius: 4,
          }} />
        </div>

        {/* Main card */}
        <div style={{
          width: 400,
          background: 'rgba(15,15,19,0.92)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderLeft: 'none',
          borderRadius: '0 16px 16px 0',
          padding: '36px 32px',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
        }}>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                color: '#c9a84c',
                letterSpacing: '-0.01em',
              }}>Finance</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: '#5a5a6e',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>Tracker</span>
            </div>
            <h1 style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 24,
              fontWeight: 600,
              color: '#e8e8f0',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>Create your account</h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: '#5a5a6e',
              marginTop: 6,
              fontWeight: 300,
            }}>Take control of your financial future</p>
          </div>

          {errors.general && (
            <div style={{
              marginBottom: 20,
              padding: '10px 14px',
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 8,
              color: '#fca5a5',
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Full Name */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: '#5a5a6e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Full Name</label>
              <input
                type="text" name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocused('fullName')}
                onBlur={() => setFocused(null)}
                placeholder="Jane Smith"
                required
                style={getInputStyle('fullName')}
              />
              {errors.fullName && <p style={{ margin: '5px 0 0', fontSize: 12, color: '#f87171', fontFamily: "'DM Sans', sans-serif" }}>{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: '#5a5a6e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Email Address</label>
              <input
                type="email" name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="jane@example.com"
                required
                style={getInputStyle('email')}
              />
              {errors.email && <p style={{ margin: '5px 0 0', fontSize: 12, color: '#f87171', fontFamily: "'DM Sans', sans-serif" }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: '#5a5a6e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  required
                  style={{ ...getInputStyle('password'), paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#5a5a6e', padding: 0, display: 'flex',
                  }}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Strength bar */}
              {formData.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: 3, borderRadius: 2,
                        background: i <= strengthScore ? strengthColor : 'rgba(255,255,255,0.07)',
                        transition: 'background 0.3s',
                      }} />
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: strengthColor, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{strengthLabel}</p>
                </div>
              )}
              {errors.password && <p style={{ margin: '5px 0 0', fontSize: 12, color: '#f87171', fontFamily: "'DM Sans', sans-serif" }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{
                display: 'block',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: '#5a5a6e',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                  placeholder="••••••••"
                  required
                  style={{ ...getInputStyle('confirmPassword'), paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#5a5a6e', padding: 0, display: 'flex',
                  }}>
                  <EyeIcon open={showConfirm} />
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div style={{
                    position: 'absolute', right: 36, top: '50%', transform: 'translateY(-50%)',
                    color: '#22c55e',
                  }}>
                    <CheckIcon />
                  </div>
                )}
              </div>
              {errors.confirmPassword && <p style={{ margin: '5px 0 0', fontSize: 12, color: '#f87171', fontFamily: "'DM Sans', sans-serif" }}>{errors.confirmPassword}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 6,
                width: '100%',
                padding: '12px 0',
                background: loading ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg, #c9a84c 0%, #e8c97a 50%, #c9a84c 100%)',
                backgroundSize: '200% 100%',
                border: 'none',
                borderRadius: 8,
                color: '#0f0f13',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.03em',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.25)',
              }}
              onMouseEnter={e => { if (!loading) e.target.style.backgroundPosition = '100% 0'; }}
              onMouseLeave={e => { e.target.style.backgroundPosition = '0 0'; }}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p style={{
            marginTop: 24,
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: '#5a5a6e',
          }}>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              style={{
                color: '#c9a84c',
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,168,76,0.3)',
                paddingBottom: 1,
              }}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;