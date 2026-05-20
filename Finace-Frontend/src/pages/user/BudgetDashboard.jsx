import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import { getMyBudget, getDailyStatus, getMonthlyStatus } from '../../api/budget';

const BudgetDashboard = () => {
  const [budget, setBudget] = useState(null);
  const [dailyStatus, setDailyStatus] = useState(null);
  const [monthlyStatus, setMonthlyStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notSetUp, setNotSetUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgetData = async () => {
      setLoading(true);
      setError('');
      setNotSetUp(false);
      try {
        const [budgetRes, dailyRes, monthlyRes] = await Promise.all([
          getMyBudget(),
          getDailyStatus(),
          getMonthlyStatus(),
        ]);
        setBudget(budgetRes.data);
        setDailyStatus(dailyRes.data);
        setMonthlyStatus(monthlyRes.data);
      } catch (err) {
        const message = err.response?.data?.message || err.response?.data;
        if (message === 'Budget not set up yet') setNotSetUp(true);
        else setError(message || 'Failed to load budget overview');
      } finally {
        setLoading(false);
      }
    };
    fetchBudgetData();
  }, []);

  const getDailyProgress = () => {
    if (!dailyStatus?.dailyLimit) return 0;
    return Math.min((dailyStatus.spent / dailyStatus.dailyLimit) * 100, 100);
  };

  const getMonthlyProgress = () => {
    if (!monthlyStatus?.spendableAmount) return 0;
    return Math.min((monthlyStatus.totalSpent / monthlyStatus.spendableAmount) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (notSetUp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <p className="text-4xl mb-4">💰</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-300 mb-2">Budget</p>
          <h1 className="text-xl font-bold text-white mb-2">Budget Overview</h1>
          <p className="text-sm text-white/50 mb-6">
            You haven't set up your budget plan yet. Create one to track daily and monthly spending.
          </p>
          <button
            onClick={() => navigate('/dashboard/budget-setup')}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-teal-500/30"
          >
            Set Up Budget
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 px-4 py-5 relative flex flex-col">

      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col gap-4 flex-1">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-teal-300 uppercase">Budget</p>
            <h1 className="text-xl font-bold text-white">Budget Overview</h1>
          </div>
          <button
            onClick={() => navigate('/dashboard/budget-setup')}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-teal-500/30"
          >
            Edit Budget
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/20 border border-rose-400/30 rounded-xl text-rose-300 text-xs">
            ⚠️ {error}
          </div>
        )}

        {/* Budget Rule Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <span className="text-teal-300 font-bold text-sm">
                  {budget?.budgetingType === 'FIFTY_THIRTY_TWENTY' ? '50' : '60'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  {budget?.budgetingType === 'FIFTY_THIRTY_TWENTY' ? '50/30/20 Rule' : '60/40 Rule'}
                </p>
                <p className="text-xs text-white/40">
                  Monthly salary: ₹{Number(budget?.salary ?? 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-xl px-3 py-2">
              <span className="text-xs text-teal-300 font-medium">Daily Limit</span>
              <span className="text-sm font-bold text-teal-200">
                ₹{Number(budget?.dailyLimit ?? 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Allocation Cards */}
        <div className={`grid gap-3 ${budget?.budgetingType === 'FIFTY_THIRTY_TWENTY' ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {budget?.budgetingType === 'FIFTY_THIRTY_TWENTY' ? (
            <>
              {[
                { label: 'Needs', pct: '50%', color: 'bg-blue-500/20 border-blue-500/30 text-blue-300', amount: budget?.needsAmount },
                { label: 'Wants', pct: '30%', color: 'bg-purple-500/20 border-purple-500/30 text-purple-300', amount: budget?.wantsAmount },
                { label: 'Savings', pct: '20%', color: 'bg-teal-500/20 border-teal-500/30 text-teal-300', amount: budget?.savingsAmount },
              ].map(({ label, pct, color, amount }) => (
                <div key={label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">{label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${color}`}>{pct}</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    ₹{Number(amount ?? 0).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <>
              {[
                { label: 'Essentials', pct: '60%', color: 'bg-blue-500/20 border-blue-500/30 text-blue-300', amount: budget?.needsAmount },
                { label: 'Savings & Goals', pct: '40%', color: 'bg-teal-500/20 border-teal-500/30 text-teal-300', amount: budget?.savingsAmount },
              ].map(({ label, pct, color, amount }) => (
                <div key={label} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">{label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${color}`}>{pct}</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    ₹{Number(amount ?? 0).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Daily & Monthly Status */}
        <div className="grid gap-4 md:grid-cols-2 flex-1">

          {/* Today's Spending */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-white">Today's Spending</p>
                <p className="text-xs text-white/40">{dailyStatus?.date || 'Today'}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                dailyStatus?.status === 'EXCEEDED'
                  ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                  : 'bg-teal-500/20 border-teal-500/30 text-teal-300'
              }`}>
                {dailyStatus?.status === 'EXCEEDED' ? '⚠️ Exceeded' : '✅ On Track'}
              </span>
            </div>

            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs text-white/40">Spent</p>
                <p className="text-2xl font-bold text-white">₹{Number(dailyStatus?.spent ?? 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">Limit</p>
                <p className="text-sm font-semibold text-white/60">₹{Number(dailyStatus?.dailyLimit ?? 0).toFixed(2)}</p>
              </div>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  dailyStatus?.status === 'EXCEEDED' ? 'bg-rose-500' : 'bg-teal-400'
                }`}
                style={{ width: `${getDailyProgress()}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-white/30">
              <span>{dailyStatus?.date || 'Today'}</span>
              <span>Remaining: ₹{Number(dailyStatus?.remaining ?? 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Monthly Status */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-white">{monthlyStatus?.month || 'Monthly Status'}</p>
                <p className="text-xs text-white/40">Summary</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                monthlyStatus?.status === 'EXCEEDED'
                  ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                  : 'bg-teal-500/20 border-teal-500/30 text-teal-300'
              }`}>
                {monthlyStatus?.status === 'EXCEEDED' ? '⚠️ Over Budget' : '✅ On Track'}
              </span>
            </div>

            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs text-white/40">Total Spent</p>
                <p className="text-2xl font-bold text-white">₹{Number(monthlyStatus?.totalSpent ?? 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">Spendable</p>
                <p className="text-sm font-semibold text-white/60">₹{Number(monthlyStatus?.spendableAmount ?? 0).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  monthlyStatus?.status === 'EXCEEDED' ? 'bg-rose-500' : 'bg-teal-400'
                }`}
                style={{ width: `${getMonthlyProgress()}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/40">Savings Goal</p>
                <p className="mt-1 font-semibold text-white text-sm">₹{Number(monthlyStatus?.savingsAmount ?? 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-xs text-white/40">Remaining</p>
                <p className={`mt-1 font-semibold text-sm ${
                  monthlyStatus?.status === 'EXCEEDED' ? 'text-rose-400' : 'text-teal-400'
                }`}>
                  ₹{Number(monthlyStatus?.remaining ?? 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;