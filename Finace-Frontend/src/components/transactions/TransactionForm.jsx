import { useState, useEffect } from 'react';
import { createTransaction } from '../../api/transactions';
import { getCategories } from '../../api/categories';

const TransactionForm = ({ onTransactionAdded }) => {
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
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      setFormData({
        amount: '',
        transdate: getDefaultDateTime(),
        transDetailes: '',
        type: 'CREDIT',
        categoryId: categories[0]?.id || '',
      });
      onTransactionAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>➕</span> Add Transaction
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="datetime-local"
            name="transdate"
            value={formData.transdate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            type="text"
            name="transDetailes"
            value={formData.transDetailes}
            onChange={handleChange}
            placeholder="Transaction details"
            required
            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'CREDIT' })}
              className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                formData.type === 'CREDIT'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'DEBIT' })}
              className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                formData.type === 'DEBIT'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-60"
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
