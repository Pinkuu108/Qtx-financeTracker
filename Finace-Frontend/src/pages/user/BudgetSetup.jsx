import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupBudget, getMyBudget } from '../../api/budget';

const BudgetSetup = () => {
  const [salary, setSalary] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const prefill = async () => {
      try {
        const res = await getMyBudget();
        setSalary(res.data.salary);
        setSelectedRule(res.data.budgetingType);
      } catch {
        // not set up yet
      }
    };
    prefill();
  }, []);

  const sal = parseFloat(salary) || 0;

  const handleSubmit = async () => {
    if (!sal || !selectedRule) return;
    setLoading(true);
    setError('');
    try {
      await setupBudget({ salary: sal, budgetingType: selectedRule });
      navigate('/dashboard/budget');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save budget');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 px-4 py-6 relative flex items-center justify-center">

      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs font-semibold tracking-widest text-teal-300 uppercase">Budgeting</p>
          <h1 className="text-2xl font-bold text-white mt-1">Create your monthly budget plan</h1>
          <p className="text-white/40 text-sm mt-1">Choose a budgeting rule and set your salary.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6 space-y-5">

          {/* Salary Input */}
          <div>
            <label className="block text-xs font-semibold text-teal-200 mb-1.5 uppercase tracking-wide">Monthly Salary</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 focus-within:border-teal-400 transition-all">
              <span className="text-teal-300 text-lg mr-3 font-bold">₹</span>
              <input
                type="number"
                min="0"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-xl font-semibold outline-none text-white placeholder-white/30"
              />
            </div>
          </div>

          {/* Rule Selection */}
          <div>
            <h2 className="text-xs font-semibold text-teal-200 uppercase tracking-wide mb-3">Choose Your Budgeting Rule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* 50/30/20 Card */}
              <div
                onClick={() => setSelectedRule('FIFTY_THIRTY_TWENTY')}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                  selectedRule === 'FIFTY_THIRTY_TWENTY'
                    ? 'border-teal-400 bg-teal-500/20 ring-2 ring-teal-400/30'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-white">50/30/20 Rule</p>
                    <p className="text-xs text-white/40 mt-0.5">50% Needs · 30% Wants · 20% Savings</p>
                  </div>
                  <span className="bg-teal-500/30 text-teal-300 border border-teal-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    POPULAR
                  </span>
                </div>
                {sal > 0 && (
                  <div className="mt-3 border-t border-white/10 pt-3 space-y-1.5">
                    {[
                      { label: 'Needs', val: sal * 0.50 },
                      { label: 'Wants', val: sal * 0.30 },
                      { label: 'Savings', val: sal * 0.20 },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-white/40">{label}</span>
                        <span className="font-semibold text-white">₹{val.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    <div className="mt-2 bg-teal-500/10 border border-teal-500/20 rounded-lg px-3 py-2 flex justify-between">
                      <span className="text-xs text-teal-300 font-medium">Daily Limit</span>
                      <span className="text-xs font-bold text-teal-200">₹{(sal * 0.80 / 26).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 60/40 Card */}
              <div
                onClick={() => setSelectedRule('SIXTY_FORTY')}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                  selectedRule === 'SIXTY_FORTY'
                    ? 'border-teal-400 bg-teal-500/20 ring-2 ring-teal-400/30'
                    : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                <div>
                  <p className="text-sm font-bold text-white">60/40 Rule</p>
                  <p className="text-xs text-white/40 mt-0.5">60% Essentials · 40% Savings & Goals</p>
                </div>
                {sal > 0 && (
                  <div className="mt-3 border-t border-white/10 pt-3 space-y-1.5">
                    {[
                      { label: 'Essentials', val: sal * 0.60 },
                      { label: 'Savings', val: sal * 0.40 },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-white/40">{label}</span>
                        <span className="font-semibold text-white">₹{val.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    <div className="mt-2 bg-teal-500/10 border border-teal-500/20 rounded-lg px-3 py-2 flex justify-between">
                      <span className="text-xs text-teal-300 font-medium">Daily Limit</span>
                      <span className="text-xs font-bold text-teal-200">₹{(sal * 0.60 / 26).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Bar */}
          {sal > 0 && selectedRule && (
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs font-semibold text-white/50 mb-3 uppercase tracking-wide">Budget Breakdown Preview</p>
              <div className="flex rounded-full overflow-hidden h-3 w-full">
                {selectedRule === 'FIFTY_THIRTY_TWENTY' ? (
                  <>
                    <div className="bg-blue-500 h-full" style={{ width: '50%' }} />
                    <div className="bg-purple-500 h-full" style={{ width: '30%' }} />
                    <div className="bg-teal-400 h-full" style={{ width: '20%' }} />
                  </>
                ) : (
                  <>
                    <div className="bg-blue-500 h-full" style={{ width: '60%' }} />
                    <div className="bg-teal-400 h-full" style={{ width: '40%' }} />
                  </>
                )}
              </div>
              <div className="flex gap-4 mt-2 flex-wrap">
                {selectedRule === 'FIFTY_THIRTY_TWENTY' ? (
                  <>
                    <span className="flex items-center gap-1 text-xs text-white/40"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Needs 50%</span>
                    <span className="flex items-center gap-1 text-xs text-white/40"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />Wants 30%</span>
                    <span className="flex items-center gap-1 text-xs text-white/40"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />Savings 20%</span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1 text-xs text-white/40"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Essentials 60%</span>
                    <span className="flex items-center gap-1 text-xs text-white/40"><span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />Savings 40%</span>
                  </>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-500/20 border border-rose-400/30 rounded-xl text-rose-300 text-xs">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!sal || !selectedRule || loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-200 ${
              !sal || !selectedRule || loading
                ? 'bg-white/10 border border-white/10 text-white/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:opacity-90 active:scale-[0.98] shadow-lg shadow-teal-500/30'
            }`}
          >
            {loading ? '⏳ Saving...' : 'Save Budget Plan'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default BudgetSetup;