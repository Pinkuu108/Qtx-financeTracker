import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'How do I get started with FinanceTracker?',
      a: 'Simply register with your name, email, and password. Once the admin activates your account, you can start logging transactions immediately.',
    },
    {
      q: 'Is my financial data secure?',
      a: 'Yes. FinanceTracker uses role-based access control and secure authentication to keep your data private and protected.',
    },
    {
      q: 'Can I create custom categories?',
      a: 'Absolutely! You can create, edit, and delete custom categories with icons to perfectly organize your income and expenses.',
    },
    {
      q: 'Is FinanceTracker free to use?',
      a: 'Yes, FinanceTracker is completely free. No credit card required, no hidden fees.',
    },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link {
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 6px 4px;
          position: relative;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-link:hover { color: #6366f1; }
        .nav-link:hover::after { width: 100%; }

        .btn-outline {
          padding: 8px 20px;
          border: 2px solid #6366f1;
          color: #6366f1;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.3px;
        }
        .btn-outline:hover {
          background: #6366f1;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,102,241,0.35);
        }

        .btn-primary {
          padding: 10px 24px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(99,102,241,0.4);
          letter-spacing: 0.3px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99,102,241,0.5);
          opacity: 0.95;
        }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          padding: 10px 24px;
          background: #fff;
          color: #6366f1;
          border: 2px solid #e5e7eb;
          border-radius: 50px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-secondary:hover {
          border-color: #6366f1;
          background: #f5f3ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99,102,241,0.15);
        }

        .feature-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px 24px;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: left;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(99,102,241,0.12);
          border-color: #e0e7ff;
        }
        .feature-card:hover::before { transform: scaleX(1); }

        .step-card {
          text-align: center;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .step-card:hover { transform: translateY(-4px); }
        .step-number {
          width: 52px; height: 52px;
          background: #fff;
          color: #6366f1;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 800;
          margin: 0 auto 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
        }
        .step-card:hover .step-number {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          box-shadow: 0 8px 25px rgba(99,102,241,0.45);
          transform: scale(1.1);
        }

        .faq-item {
          border-bottom: 1px solid #e5e7eb;
          transition: background 0.2s;
          border-radius: 10px;
          margin-bottom: 4px;
          overflow: hidden;
        }
        .faq-question {
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          transition: color 0.2s;
          user-select: none;
        }
        .faq-question:hover { color: #6366f1; }
        .faq-icon {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e0e7ff, #f3e8ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          color: #6366f1;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .faq-icon.open {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          color: #fff;
          transform: rotate(45deg);
        }
        .faq-answer {
          padding: 0 20px 16px;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: default;
        }
        .transaction-item:hover {
          background: #f9fafb;
          transform: translateX(4px);
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          pointer-events: none;
        }

        .how-card {
          padding: 28px 24px;
          border-radius: 20px;
          transition: all 0.3s ease;
          cursor: default;
        }
        .how-card.active {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          box-shadow: 0 16px 40px rgba(99,102,241,0.35);
        }
        .how-card.active:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 50px rgba(99,102,241,0.45);
        }
        .how-card.inactive:hover {
          background: #f9fafb;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .icon-bubble {
          width: 56px; height: 56px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          margin-bottom: 16px;
          transition: transform 0.3s ease;
        }
        .feature-card:hover .icon-bubble { transform: scale(1.1) rotate(-5deg); }

        @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: floatUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .card-float { animation: pulse-soft 4s ease-in-out infinite; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 #f0f0f0',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
          }}>💰</div>
          <span style={{
            fontSize: 17, fontWeight: 800,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>FinanceTracker</span>
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <span className="nav-link" onClick={() => scrollToSection('hero')}>Home</span>
          <span className="nav-link" onClick={() => scrollToSection('how-it-works')}>How it Works</span>
          <span className="nav-link" onClick={() => scrollToSection('faq')}>FAQ</span>
          <span className="nav-link" onClick={() => scrollToSection('features')}>Features</span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn-outline" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        background: 'linear-gradient(145deg, #fafbff 0%, #f0f4ff 40%, #faf0ff 100%)',
        padding: '80px 40px 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="blob" style={{ width: 400, height: 400, background: '#c7d2fe', top: -100, left: -100 }} />
        <div className="blob" style={{ width: 300, height: 300, background: '#e9d5ff', bottom: -80, right: 100 }} />
        <div className="blob" style={{ width: 200, height: 200, background: '#bfdbfe', top: 100, right: 300 }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left */}
          <div className="animate-in">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#ede9fe', color: '#7c3aed',
              padding: '6px 14px', borderRadius: 50, fontSize: 13, fontWeight: 600,
              marginBottom: 20,
            }}>
              <span>✨</span> Get Started Today
            </div>
            <h1 style={{ fontSize: 46, fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
              We <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Guarantee</span><br />
              The Worthiness Of<br />
              Every <span style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Money</span> Transaction.
            </h1>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
              Track income and expenses, manage custom categories, and get a crystal-clear picture of where your money goes — all in one place.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <button className="btn-primary" style={{ padding: '13px 28px', fontSize: 15 }} onClick={() => navigate('/register')}>
                Get Started Free
              </button>
              <button className="btn-secondary" style={{ padding: '13px 28px', fontSize: 15 }} onClick={() => scrollToSection('how-it-works')}>
                ▶ How it Works
              </button>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 14 }}>
              No credit card required · Free to use · Secure
            </p>
          </div>

          {/* Right — App mockup card */}
          <div className="animate-in delay-2 card-float" style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 24px 60px rgba(99,102,241,0.15)',
            overflow: 'hidden',
            border: '1px solid #e8e8f0',
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              padding: '20px 20px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginBottom: 4 }}>Welcome!</div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>John Doe</div>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👤</div>
              </div>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 4 }}>Total Balance</div>
                <div style={{ color: '#fff', fontSize: 32, fontWeight: 800 }}>₹5,240.00</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, padding: '10px 0 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6ee7b7' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>Income</div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>₹8,500.00</div>
                  </div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fca5a5' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>Expenses</div>
                    <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>₹3,260.00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions list */}
            <div style={{ padding: '16px 16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1f2937' }}>Transactions</span>
                <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}>View All</span>
              </div>
              {[
                { icon: '💼', label: 'Salary', date: 'May 18 2026', amount: '+₹3,500.00', color: '#10b981', bg: '#d1fae5' },
                { icon: '🛒', label: 'Groceries', date: 'May 17 2026', amount: '-₹120.50', color: '#ef4444', bg: '#fee2e2' },
                { icon: '🏠', label: 'Home Rent', date: 'May 15 2026', amount: '-₹1,200.00', color: '#ef4444', bg: '#fee2e2' },
                { icon: '🎬', label: 'Entertainment', date: 'May 14 2026', amount: '-₹60.00', color: '#ef4444', bg: '#fee2e2' },
              ].map((t, i) => (
                <div key={i} className="transaction-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{t.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#111827' }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{t.date}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: t.color }}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: '90px 40px', background: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 300, height: 300, background: '#ddd6fe', top: -60, right: -60, opacity: 0.25 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left — chart mockup */}
          <div style={{
            background: '#f8faff',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 8px 40px rgba(99,102,241,0.1)',
            border: '1px solid #e8eaf6',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📊</div>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#1f2937' }}>Transactions</span>
              </div>
              <span style={{ fontSize: 18, cursor: 'pointer', color: '#9ca3af' }}>⋮</span>
            </div>
            <div style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
              <button style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px 0 0 8px', fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.borderColor = '#6366f1'; e.target.style.color = '#6366f1'; }}
                onMouseLeave={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.color = '#374151'; }}>
                Income
              </button>
              <button style={{ flex: 1, padding: '8px', background: 'linear-gradient(135deg,#6366f1,#a855f7)', border: 'none', borderRadius: '0 8px 8px 0', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                Expenses
              </button>
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 4 }}>01 Jan 2026 – 01 May 2026</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#6366f1', marginBottom: 20 }}>₹3,500.00</div>
            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 16 }}>
              {[55, 40, 70, 90, 60, 75, 45, 80].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%', height: `${h}%`,
                    background: i === 3 ? 'linear-gradient(180deg,#6366f1,#a855f7)' : 'linear-gradient(180deg,#c7d2fe,#ddd6fe)',
                    borderRadius: 6,
                    transition: 'background 0.3s',
                  }} />
                  <span style={{ fontSize: 10, color: '#9ca3af' }}>0{i + 1}</span>
                </div>
              ))}
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#374151', marginBottom: 10 }}>Sat, 20 May 2026 <span style={{ float: 'right', color: '#ef4444' }}>-₹500.00</span></div>
            {[
              { icon: '🏠', label: 'Home Rent', amount: '-₹350.00', bg: '#fef3c7' },
              { icon: '🐾', label: 'Pet Groom', amount: '-₹50.00', bg: '#dbeafe' },
              { icon: '📱', label: 'Recharge', amount: '-₹100.00', bg: '#d1fae5' },
            ].map((t, i) => (
              <div key={i} className="transaction-item" style={{ borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{t.icon}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{t.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ef4444' }}>{t.amount}</span>
              </div>
            ))}
          </div>

          {/* Right */}
          <div>
            <div style={{ display: 'inline-block', color: '#a855f7', fontWeight: 700, fontSize: 13, marginBottom: 12, letterSpacing: 0.5 }}>Benefits</div>
            <h2 style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: 20 }}>
              We Make Money<br />Work In Your Favor.
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.75, marginBottom: 32 }}>
              Get a complete overview of your financial life. See patterns, track spending habits, and make smarter decisions with intuitive dashboards and reports.
            </p>
            <button className="btn-outline" style={{ borderRadius: 12, padding: '12px 28px', fontSize: 15 }} onClick={() => navigate('/register')}>
              Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '90px 40px', background: 'linear-gradient(145deg,#f8faff,#f3f0ff)', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 350, height: 350, background: '#c7d2fe', bottom: -100, left: -80, opacity: 0.3 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 13, marginBottom: 12, letterSpacing: 0.5 }}>How It Works</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Add Your All Daily Expenses</h2>
          <p style={{ fontSize: 15, color: '#64748b', maxWidth: 500, margin: '0 auto 52px', lineHeight: 1.7 }}>
            Simple three-step process to get you up and running in minutes.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '👤', label: 'Create a Account', desc: 'Sign up with your name, email and password. It only takes a minute to get your personal dashboard ready.', active: true },
              { icon: '➕', label: 'Add Daily Expenses', desc: 'Log your transactions instantly with amounts, categories, and dates. Track every rupee as it flows.', active: false },
              { icon: '💰', label: 'Track Your Budget', desc: 'Watch your balance update in real-time. Get insights on where your money goes with clear category breakdowns.', active: false },
            ].map((step, i) => (
              <div key={i} className={`how-card ${step.active ? 'active' : 'inactive'}`}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: step.active ? 'rgba(255,255,255,0.25)' : 'linear-gradient(135deg,#c7d2fe,#ddd6fe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, margin: '0 auto 18px',
                  boxShadow: step.active ? '0 0 0 8px rgba(255,255,255,0.15)' : 'none',
                }}>{step.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: step.active ? '#fff' : '#1f2937', marginBottom: 12 }}>{step.label}</h3>
                <p style={{ fontSize: 13, color: step.active ? 'rgba(255,255,255,0.85)' : '#6b7280', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '90px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 13, marginBottom: 12, letterSpacing: 0.5 }}>Features</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>Everything You Need to Manage Your Money</h2>
            <p style={{ fontSize: 15, color: '#64748b', maxWidth: 480, margin: '0 auto' }}>
              Powerful tools designed to give you complete financial clarity.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '📊', bg: 'linear-gradient(135deg,#6366f1,#818cf8)', title: 'Track Transactions', desc: 'Log income and expenses instantly with categories, dates, and notes. See your full history at a glance.' },
              { icon: '🗂️', bg: 'linear-gradient(135deg,#10b981,#34d399)', title: 'Organize by Category', desc: 'Create custom categories with icons and colors. Keep your finances structured exactly the way you want.' },
              { icon: '🔐', bg: 'linear-gradient(135deg,#a855f7,#c084fc)', title: 'Secure & Role-based', desc: 'Admin-controlled user activation and role-based access ensures your data stays private and protected.' },
              { icon: '📈', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)', title: 'Visual Analytics', desc: 'Beautiful charts and graphs to help you understand your spending patterns and financial trends.' },
              { icon: '⚡', bg: 'linear-gradient(135deg,#ef4444,#f87171)', title: 'Real-time Balance', desc: 'Your balance updates instantly with every transaction. Always know exactly where you stand financially.' },
              { icon: '🌙', bg: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', title: 'Clean Dashboard', desc: 'A beautifully designed interface that makes managing your finances feel effortless and even enjoyable.' },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="icon-bubble" style={{ background: f.bg }}>
                  <span style={{ fontSize: 26 }}>{f.icon}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1f2937', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '90px 40px', background: 'linear-gradient(145deg,#fafbff,#f5f0ff)', position: 'relative', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 300, height: 300, background: '#ddd6fe', top: -60, right: -60, opacity: 0.3 }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Left illustration placeholder */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'linear-gradient(135deg,#ede9fe,#fce7f3)',
              borderRadius: 24,
              height: 340,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 80,
              boxShadow: '0 8px 40px rgba(168,85,247,0.12)',
              border: '1px solid #e9d5ff',
              position: 'relative', overflow: 'hidden',
            }}>
              <div className="blob" style={{ width: 200, height: 200, background: '#c4b5fd', top: -40, right: -40, opacity: 0.4 }} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 70, marginBottom: 12 }}>💬</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#7c3aed' }}>Got Questions?</div>
                <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>We have answers.</div>
              </div>
            </div>
            <div style={{
              position: 'absolute', bottom: -12, left: 20,
              background: '#fff', borderRadius: 12, padding: '10px 16px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#374151',
            }}>
              <span style={{ fontSize: 18 }}>❓</span> 24/7 Support Available
            </div>
          </div>

          {/* Right */}
          <div>
            <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 13, marginBottom: 12, letterSpacing: 0.5 }}>FAQ</div>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#0f172a', marginBottom: 30, lineHeight: 1.3 }}>
              Do You Have<br />Any Questions?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item" style={{ background: openFaq === i ? '#fafbff' : '#fff', border: '1px solid', borderColor: openFaq === i ? '#e0e7ff' : '#f3f4f6' }}>
                  <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <div className={`faq-icon ${openFaq === i ? 'open' : ''}`}>+</div>
                  </div>
                  {openFaq === i && (
                    <div className="faq-answer">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '90px 40px', background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #1e1b4b 100%)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="blob" style={{ width: 400, height: 400, background: '#7c3aed', top: -100, left: '30%', opacity: 0.2 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Start Tracking Your Finances Today
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
            Join thousands of users who have taken control of their financial future with FinanceTracker.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: 15, background: '#fff', color: '#6366f1', boxShadow: '0 8px 30px rgba(0,0,0,0.25)' }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.25)'; }}
              onClick={() => navigate('/register')}
            >
              Create Free Account
            </button>
            <button
              style={{ padding: '14px 32px', fontSize: 15, background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 50, fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.target.style.borderColor = '#fff'; e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.background = 'transparent'; e.target.style.transform = 'translateY(0)'; }}
              onClick={() => navigate('/login')}
            >
              Sign In →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0f172a', padding: '50px 40px 30px', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>💰</div>
                <span style={{ fontSize: 16, fontWeight: 800, background: 'linear-gradient(135deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FinanceTracker</span>
              </div>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, maxWidth: 220 }}>
                Take control of your finances with smart tracking, beautiful analytics, and secure data management.
              </p>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {['𝕏', 'in', '📘'].map((s, i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#a855f7)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >{s}</div>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: 'Company', links: ['About', 'Terms of Use', 'Privacy Policy', 'How It Works'] },
              { title: 'Support', links: ['Support Center', '24/7 Service', 'Quick Chat', 'Contact Us'] },
              { title: 'Contact', links: ['support@finance.app', 'WhatsApp Us', 'Twitter / X', 'LinkedIn'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16, color: '#e2e8f0' }}>{col.title}</div>
                {col.links.map((link, j) => (
                  <div key={j} style={{
                    fontSize: 13, color: '#94a3b8', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#c084fc'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >{link}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
            © 2026 FinanceTracker. Built with React + Spring Boot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;