import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../api/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginUser(formData);
      const userData = response.data;
      login(userData);
      if (userData.role === 'ROLE_ADMIN') navigate('/admin');
      else if (userData.active) navigate('/dashboard');
      else navigate('/inactive');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 16px 12px 42px',
    border: `1.5px solid ${focused === field ? '#6352DC' : '#E8E6F4'}`,
    borderRadius: '10px',
    fontSize: '14px',
    color: '#1a1a2e',
    background: focused === field ? '#faf9ff' : '#F5F4FC',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: focused === field ? '0 0 0 3px rgba(99,82,220,0.1)' : 'none',
  });

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* Centered compact card — 50/50 split */}
      <div style={{
        display: 'flex',
        width: '860px',
        maxWidth: '100%',
        minHeight: '540px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 24px 72px rgba(80,60,180,0.2), 0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── LEFT: Form panel ── */}
        <div style={{
          flex: '1 1 50%',
          background: '#ffffff',
          padding: '44px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>

          {/* Brand */}
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            gap: '8px', marginBottom: '28px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '9px',
              background: 'linear-gradient(135deg, #6352DC, #8B7AED)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '15px',
            }}>💰</div>
            <span style={{
              fontSize: '15px', fontWeight: '800',
              fontFamily: "'Syne', sans-serif",
              background: 'linear-gradient(135deg, #4A3DB5, #6352DC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>FinanceTracker</span>
          </div>

          <h1 style={{
            fontSize: '24px', fontWeight: '800',
            fontFamily: "'Syne', sans-serif",
            color: '#1a1a2e', margin: '0 0 4px',
            letterSpacing: '-0.5px',
          }}>Welcome back</h1>
          <p style={{
            fontSize: '13px', color: '#9490B0',
            margin: '0 0 24px', fontWeight: '400',
          }}>
            Sign in to continue to your dashboard
          </p>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: '16px', padding: '10px 14px',
              background: '#fff0f0', border: '1px solid #fcc',
              borderRadius: '9px', color: '#c0392b',
              fontSize: '13px', display: 'flex',
              alignItems: 'center', gap: '7px',
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              display: 'block', fontSize: '11px', fontWeight: '700',
              color: '#6B6490', marginBottom: '6px',
              letterSpacing: '0.6px', textTransform: 'uppercase',
            }}>Email</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '13px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '15px',
                pointerEvents: 'none',
                color: focused === 'email' ? '#6352DC' : '#C0BADC',
                transition: 'color 0.2s',
              }}>✉</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                style={inputStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '6px',
            }}>
              <label style={{
                fontSize: '11px', fontWeight: '700',
                color: '#6B6490', letterSpacing: '0.6px',
                textTransform: 'uppercase',
              }}>Password</label>
              <span style={{
                fontSize: '12px', color: '#6352DC',
                cursor: 'pointer', fontWeight: '600',
              }}>Forgot?</span>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '13px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '15px',
                pointerEvents: 'none',
                color: focused === 'password' ? '#6352DC' : '#C0BADC',
                transition: 'color 0.2s',
              }}>🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{ ...inputStyle('password'), paddingRight: '42px' }}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '13px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer',
                  fontSize: '15px', color: '#C0BADC', padding: 0,
                }}
              >{showPassword ? '🙈' : '👁'}</button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: loading ? '#A89EE8' : 'linear-gradient(135deg, #6352DC 0%, #7C6DE8 100%)',
              color: '#fff', border: 'none',
              borderRadius: '10px', fontSize: '14px',
              fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s ease',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(99,82,220,0.38)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '14px', height: '14px',
                  border: '2px solid rgba(255,255,255,0.35)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 0.7s linear infinite',
                }} />
                Signing in…
              </>
            ) : 'Sign in →'}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '10px', margin: '18px 0',
          }}>
            <div style={{ flex: 1, height: '1px', background: '#EDE9FA' }} />
            <span style={{ fontSize: '11px', color: '#C0BADC', fontWeight: '500' }}>
              or continue with
            </span>
            <div style={{ flex: 1, height: '1px', background: '#EDE9FA' }} />
          </div>

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            {[
              { icon: '🔵', label: 'Google' },
              { icon: '🔷', label: 'Facebook' },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                style={{
                  flex: 1, padding: '10px',
                  background: '#F5F4FC',
                  border: '1.5px solid #E8E6F4',
                  borderRadius: '10px', fontSize: '13px',
                  fontWeight: '600', color: '#3D3460',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '6px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#6352DC';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F5F4FC';
                  e.currentTarget.style.borderColor = '#E8E6F4';
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* Register link */}
          <p style={{
            textAlign: 'center', fontSize: '13px',
            color: '#9490B0', margin: 0,
          }}>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              style={{
                color: '#6352DC', fontWeight: '700',
                cursor: 'pointer',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(99,82,220,0.3)',
              }}
            >
              Create one
            </span>
          </p>
        </div>

        {/* ── RIGHT: Visual panel ── */}
        <div style={{
          flex: '1 1 50%',
          background: 'linear-gradient(150deg, #7C6DE8 0%, #5B49CC 40%, #4033A8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          position: 'relative',
          overflow: 'hidden',
          gap: '16px',
        }}>

          {/* Background decoration circles */}
          <div style={{
            position: 'absolute', top: '-50px', right: '-50px',
            width: '200px', height: '200px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-70px', left: '-50px',
            width: '240px', height: '240px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
          }} />

          {/* Balance card */}
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.13)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.18)',
            padding: '22px 20px',
          }}>
            <p style={{
              fontSize: '10px', fontWeight: '700',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '1.2px', textTransform: 'uppercase',
              margin: '0 0 6px',
            }}>Total Balance</p>
            <p style={{
              fontSize: '30px', fontWeight: '800',
              fontFamily: "'Syne', sans-serif",
              color: '#fff', margin: '0 0 14px',
              letterSpacing: '-1px',
            }}>$24,563.00</p>

            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'Income', value: '+$3,240', color: '#4ade80' },
                { label: 'Expense', value: '−$1,180', color: '#f87171' },
              ].map(stat => (
                <div key={stat.label} style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.09)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                }}>
                  <p style={{
                    fontSize: '9px', fontWeight: '700',
                    color: 'rgba(255,255,255,0.5)',
                    margin: '0 0 3px', letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                  }}>{stat.label}</p>
                  <p style={{
                    fontSize: '15px', fontWeight: '700',
                    color: stat.color, margin: 0,
                  }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly overview */}
          <div style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.14)',
            padding: '18px 20px',
          }}>
            <p style={{
              fontSize: '10px', fontWeight: '700',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '1px', textTransform: 'uppercase',
              margin: '0 0 12px',
            }}>Monthly Overview</p>

            {/* Bar chart */}
            <div style={{
              display: 'flex', alignItems: 'flex-end',
              gap: '7px', height: '52px',
            }}>
              {[35, 60, 42, 75, 50, 88, 65].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  borderRadius: '4px 4px 0 0',
                  background: i === 5
                    ? 'rgba(255,255,255,0.92)'
                    : 'rgba(255,255,255,0.28)',
                }} />
              ))}
            </div>

            {/* Month labels */}
            <div style={{
              display: 'flex', gap: '7px', marginTop: '6px',
            }}>
              {['J','F','M','A','M','J','J'].map((m, i) => (
                <div key={i} style={{
                  flex: 1, textAlign: 'center',
                  fontSize: '9px', fontWeight: '600',
                  color: i === 5 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p style={{
            textAlign: 'center', fontSize: '13px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.6', margin: 0,
          }}>
            Track smarter. Save better.<br />
            <span style={{
              color: 'rgba(255,255,255,0.92)',
              fontWeight: '700', fontSize: '14px',
            }}>Your finances, simplified.</span>
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default LoginForm;