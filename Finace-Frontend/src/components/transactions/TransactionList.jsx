import { useState } from 'react';

const TransactionList = ({ transactions }) => {
  const [filter, setFilter] = useState('ALL');

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'ALL') return true;
    return t.type === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>📊</span> Transactions
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === 'ALL'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('CREDIT')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === 'CREDIT'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setFilter('DEBIT')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === 'DEBIT'
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-3">💸</p>
          <p className="text-lg font-medium">No transactions yet</p>
          <p className="text-sm mt-1">Add your first transaction to get started</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTransactions.map((transaction, index) => (
            <div key={transaction.id}>
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'CREDIT' ? 'bg-emerald-100' : 'bg-rose-100'
                  }`}>
                    <span className="text-2xl">{transaction.category?.icon || '📝'}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{transaction.category?.name || 'Uncategorized'}</p>
                    <p className="text-sm text-gray-600">{transaction.transDetailes}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(transaction.transdate)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'CREDIT' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
              {index < filteredTransactions.length - 1 && (
                <div className="border-b border-gray-50 mx-4"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
