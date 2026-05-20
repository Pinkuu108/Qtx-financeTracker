import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransactions } from '../api/transactions';
import { getMyBudget, getDailyStatus } from '../api/budget';
import Spinner from '../components/ui/Spinner';

const formatCurrency = (amount) =>
  '₹' + Number(amount || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

const categoryIcon = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('food') || n.includes('dining') || n.includes('dinner') || n.includes('lunch') || n.includes('swiggy') || n.includes('zomato')) return '🍽️';
  if (n.includes('transport') || n.includes('travel') || n.includes('uber') || n.includes('ola') || n.includes('fuel')) return '🚗';
  if (n.includes('shop') || n.includes('amazon') || n.includes('flipkart')) return '🛒';
  if (n.includes('salary') || n.includes('income')) return '💼';
  if (n.includes('rent') || n.includes('house') || n.includes('home') || n.includes('room')) return '🏠';
  if (n.includes('entertain') || n.includes('netflix') || n.includes('movie')) return '🎬';
  if (n.includes('health') || n.includes('medical') || n.includes('pharmacy')) return '🏥';
  if (n.includes('utility') || n.includes('electric') || n.includes('bill')) return '💡';
  return '💳';
};

// ── Inline styles ──────────────────────────────────────────────
const card = {
  borderRadius: '16px',
  padding: '20px',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
};

const DashboardHome = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(null);
  const [dailyBudgetStatus, setDailyBudgetStatus] = useState(null);
  const [budgetLoading, setBudgetLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getTransactions();
        setTransactions(res.data);
      } catch (err) {
        console.error('Transactions fetch failed:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setBudgetLoading(true);
      try {
        const [bRes, dRes] = await Promise.all([getMyBudget(), getDailyStatus()]);
        setBudget(bRes.data);
        setDailyBudgetStatus(dRes.data);
      } catch (err) {
        const msg = err.response?.data?.message || err.response?.data;
        if (msg !== 'Budget not set up yet') console.error('Budget fetch failed:', err);
        setBudget(null);
        setDailyBudgetStatus(null);
      } finally {
        setBudgetLoading(false);
      }
    })();
  }, []);

  const totalIncome = transactions.filter((t) => t.type === 'CREDIT').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'DEBIT').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const recentTransactions = transactions.slice(0, 5);

  const spentPct = dailyBudgetStatus?.dailyLimit
    ? Math.min((dailyBudgetStatus.spent / dailyBudgetStatus.dailyLimit) * 100, 100)
    : 0;

  const budgetRule =
    budget?.budgetingType === 'FIFTY_THIRTY_TWENTY' ? '50/30/20 Rule' : '60/40 Rule';

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '80px' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div style={{ color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>

      {/* ── Greeting ── */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
          Here's your overview 👋
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
          Here's what's happening with your finances
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {/* Income */}
        <div style={{ borderRadius: '16px', padding: '20px', color: 'white', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)', boxShadow: '0 8px 24px rgba(13,148,136,0.35)' }}>
          <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', opacity: 0.75, marginBottom: '14px' }}>TOTAL INCOME</div>
          <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{formatCurrency(totalIncome)}</div>
          <div style={{ fontSize: '12px', opacity: 0.65 }}>All credited transactions</div>
          <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '28px' }}>💰</div>
        </div>

        {/* Expenses */}
        <div style={{ borderRadius: '16px', padding: '20px', color: 'white', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #f97316 0%, #e11d48 100%)', boxShadow: '0 8px 24px rgba(249,115,22,0.35)' }}>
          <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', opacity: 0.75, marginBottom: '14px' }}>TOTAL EXPENSES</div>
          <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{formatCurrency(totalExpense)}</div>
          <div style={{ fontSize: '12px', opacity: 0.65 }}>All debited transactions</div>
          <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '28px' }}>🛒</div>
        </div>

        {/* Balance */}
        <div style={{ borderRadius: '16px', padding: '20px', color: 'white', position: 'relative', overflow: 'hidden', background: balance >= 0 ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', boxShadow: balance >= 0 ? '0 8px 24px rgba(99,102,241,0.35)' : '0 8px 24px rgba(220,38,38,0.35)' }}>
          <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', opacity: 0.75, marginBottom: '14px' }}>NET BALANCE</div>
          <div style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>{formatCurrency(Math.abs(balance))}</div>
          <div style={{ fontSize: '12px', opacity: 0.65 }}>{balance >= 0 ? 'You are in profit' : 'Overspent this period'}</div>
          <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '28px' }}>{balance >= 0 ? '📈' : '📉'}</div>
        </div>
      </div>

      {/* ── Budget + Transactions Row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)',
          gap: '16px',
          alignItems: 'start',
        }}
      >
        {/* ── Left Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {budgetLoading ? (
            <div style={{ ...card, display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <Spinner size="md" />
            </div>
          ) : budget ? (
            <>
              {/* Budget Plan */}
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#64748b' }}>BUDGET PLAN</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', background: 'rgba(13,148,136,0.2)', color: '#2dd4bf', border: '1px solid rgba(13,148,136,0.3)' }}>
                    {budgetRule}
                  </span>
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9', marginBottom: '4px' }}>
                  {formatCurrency(budget.salary)}
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>Monthly salary</div>
              </div>

              {/* Today's Spending */}
              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#64748b' }}>TODAY'S SPENDING</span>
                  <span style={{
                    fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px',
                    background: dailyBudgetStatus?.status === 'EXCEEDED' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                    color: dailyBudgetStatus?.status === 'EXCEEDED' ? '#f87171' : '#34d399',
                    border: `1px solid ${dailyBudgetStatus?.status === 'EXCEEDED' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
                  }}>
                    {dailyBudgetStatus?.status === 'EXCEEDED' ? '⚠ Exceeded' : '✓ On Track'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#f1f5f9' }}>
                      {formatCurrency(dailyBudgetStatus?.spent || 0)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                      of {formatCurrency(dailyBudgetStatus?.dailyLimit || 0)} daily limit
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#475569' }}>
                    {Math.round(spentPct)}%
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ height: '8px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    borderRadius: '999px',
                    width: `${spentPct}%`,
                    background: dailyBudgetStatus?.status === 'EXCEEDED'
                      ? 'linear-gradient(90deg, #ef4444, #f87171)'
                      : 'linear-gradient(90deg, #0d9488, #34d399)',
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            </>
          ) : (
            /* No budget */
            <div style={{ ...card, borderColor: 'rgba(245,158,11,0.3)', background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.04))' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚠️</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>No Budget Set Up</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                Set up your budget to track daily spending and reach your goals.
              </div>
              <button
                onClick={() => navigate('/dashboard/budget-setup')}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'white', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                Set Up Budget →
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div style={card}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#64748b', marginBottom: '12px' }}>QUICK ACTIONS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { label: 'Add Transaction', icon: '➕', path: '/dashboard/add', bg: 'linear-gradient(135deg, #0d9488, #06b6d4)' },
                { label: 'View Budget', icon: '📊', path: '/dashboard/budget-setup', bg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)' },
                { label: 'All Transactions', icon: '📋', path: '/dashboard/transactions', bg: 'linear-gradient(135deg, #f97316, #e11d48)' },
                { label: 'Categories', icon: '🏷️', path: '/dashboard/categories', bg: 'linear-gradient(135deg, #2563eb, #4f46e5)' },
              ].map((a) => (
                <button
                  key={a.path}
                  onClick={() => navigate(a.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 12px', borderRadius: '10px', border: 'none',
                    cursor: 'pointer', fontWeight: 700, fontSize: '12px',
                    color: 'white', background: a.bg,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  }}
                >
                  <span>{a.icon}</span>
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Recent Transactions ── */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9' }}>Recent Transactions</div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Last {recentTransactions.length} entries</div>
            </div>
            {recentTransactions.length > 0 && (
              <button
                onClick={() => navigate('/dashboard/transactions')}
                style={{
                  fontSize: '12px', fontWeight: 700, color: '#2dd4bf',
                  padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(13,148,136,0.3)',
                  background: 'rgba(13,148,136,0.1)', cursor: 'pointer',
                }}
              >
                View All →
              </button>
            )}
          </div>

          {/* Empty */}
          {recentTransactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>No transactions yet</div>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>Add your first transaction to get started</div>
              <button
                onClick={() => navigate('/dashboard/add')}
                style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: 'white', background: 'linear-gradient(135deg, #0d9488, #059669)' }}
              >
                ➕ Add Transaction
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentTransactions.map((t) => {
                const isCredit = t.type === 'CREDIT';
                return (
                  <div
                    key={t.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '12px', borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      background: 'rgba(255,255,255,0.03)',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  >
                    {/* Icon */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', flexShrink: 0,
                      background: isCredit
                        ? 'linear-gradient(135deg, rgba(13,148,136,0.25), rgba(5,150,105,0.15))'
                        : 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(225,29,72,0.15))',
                      border: isCredit ? '1px solid rgba(13,148,136,0.3)' : '1px solid rgba(249,115,22,0.3)',
                    }}>
                      {categoryIcon(t.category?.name)}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.category?.name || 'Uncategorized'}
                        </span>
                        <span style={{
                          fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', flexShrink: 0,
                          background: isCredit ? 'rgba(13,148,136,0.2)' : 'rgba(249,115,22,0.2)',
                          color: isCredit ? '#2dd4bf' : '#fb923c',
                        }}>
                          {isCredit ? 'CREDIT' : 'DEBIT'}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.transDetailes}
                      </div>
                      <div style={{ fontSize: '11px', color: '#334155', marginTop: '2px' }}>
                        {formatDate(t.transdate)}
                      </div>
                    </div>

                    {/* Amount */}
                    <div style={{ fontSize: '14px', fontWeight: 700, flexShrink: 0, color: isCredit ? '#2dd4bf' : '#f87171' }}>
                      {isCredit ? '+' : '-'}{formatCurrency(t.amount)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;