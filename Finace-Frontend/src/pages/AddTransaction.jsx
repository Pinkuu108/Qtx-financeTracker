import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../api/transactions';
import { getCategories } from '../api/categories';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getDefaultDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    amount: '',
    transdate: getDefaultDateTime(),
    transDetailes: '',
    type: 'CREDIT',
    categoryId: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      if (response.data.length > 0) {
        setFormData((prev) => ({ ...prev, categoryId: response.data[0].id }));
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
        categoryId: parseInt(formData.categoryId),
        transdate: formData.transdate + ':00',
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/home');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 flex items-start justify-center px-4 py-8">

      {/* Background decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">

        {/* Header outside card */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Add New Transaction</h1>
          <p className="text-teal-300 text-sm mt-1">Track your income and expenses</p>
        </div>

        {/* Summary stat pills */}
        <div className="flex justify-center gap-3 mb-5">
          <span className="px-4 py-1.5 bg-teal-500/20 border border-teal-500/30 text-teal-300 rounded-full text-xs font-medium backdrop-blur-sm">
            💰 Income → CREDIT
          </span>
          <span className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-full text-xs font-medium backdrop-blur-sm">
            💸 Expense → DEBIT
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6">

          {error && (
            <div className="mb-4 p-3 bg-rose-500/20 border border-rose-400/30 rounded-xl text-rose-300 text-xs backdrop-blur-sm">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-teal-500/20 border border-teal-400/30 rounded-xl text-teal-300 text-xs backdrop-blur-sm">
              ✅ Transaction added successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-teal-200 mb-1.5 uppercase tracking-wide">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-300 font-bold text-sm">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  required
                  className="w-full pl-8 pr-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all duration-200 text-sm backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-xs font-semibold text-teal-200 mb-1.5 uppercase tracking-wide">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="transdate"
                value={formData.transdate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all duration-200 text-sm backdrop-blur-sm [color-scheme:dark]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-teal-200 mb-1.5 uppercase tracking-wide">
                Description
              </label>
              <input
                type="text"
                name="transDetailes"
                value={formData.transDetailes}
                onChange={handleChange}
                placeholder="e.g. Grocery shopping, Salary..."
                required
                className="w-full px-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all duration-200 text-sm backdrop-blur-sm"
              />
            </div>

            {/* Type Toggle */}
            <div>
              <label className="block text-xs font-semibold text-teal-200 mb-1.5 uppercase tracking-wide">
                Type
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'CREDIT' })}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                    formData.type === 'CREDIT'
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  ↑ Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'DEBIT' })}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all duration-200 text-sm ${
                    formData.type === 'DEBIT'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  ↓ Expense
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-teal-200 mb-1.5 uppercase tracking-wide">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/20 text-white rounded-xl focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all duration-200 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id} className="bg-slate-800">
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 mt-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-teal-500/30 hover:opacity-90 hover:shadow-teal-500/50 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 text-sm tracking-wide"
            >
              {loading ? '⏳ Adding...' : '+ Add Transaction'}
            </button>

          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-white/30 text-xs mt-4">
          Transaction will be saved to your personal account
        </p>
      </div>
    </div>
  );
};

export default AddTransaction;