import { useState, useEffect } from 'react';
import { getTransactions } from '../api/transactions';
import Spinner from '../components/ui/Spinner';

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => { fetchTransactions(); }, []);
  useEffect(() => { filterTransactions(); }, [transactions, filter, searchTerm]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;
    if (filter === 'CREDIT') filtered = filtered.filter((t) => t.type === 'CREDIT');
    else if (filter === 'DEBIT') filtered = filtered.filter((t) => t.type === 'DEBIT');
    if (searchTerm) {
      filtered = filtered.filter(
        (t) =>
          t.transDetailes.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 px-4 py-6 relative">

      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-500 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            📋 All Transactions
          </h2>
          <p className="text-teal-300 text-sm mt-1">View and filter your complete transaction history</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-300 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by description or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400/50 transition-all duration-200 text-sm backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { key: 'ALL', label: `All (${transactions.length})` },
            { key: 'CREDIT', label: `Income (${transactions.filter((t) => t.type === 'CREDIT').length})` },
            { key: 'DEBIT', label: `Expenses (${transactions.filter((t) => t.type === 'DEBIT').length})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full font-semibold transition-all duration-200 text-xs border ${
                filter === key
                  ? key === 'DEBIT'
                    ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-teal-500 border-teal-400 text-white shadow-lg shadow-teal-500/30'
                  : 'bg-white/10 border-white/20 text-white/60 hover:text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-3">📭</p>
              <p className="text-base font-bold text-white mb-1">No transactions found</p>
              <p className="text-xs text-white/40">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-teal-300 uppercase tracking-wider">Transaction</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-teal-300 uppercase tracking-wider">Amount</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-teal-300 uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-teal-300 uppercase tracking-wider hidden sm:table-cell">Type</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold text-teal-300 uppercase tracking-wider hidden lg:table-cell">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {currentTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-white/5 transition-all duration-200 group"
                      >
                        <td className="px-5 py-3.5">
                          <div className="font-semibold text-white text-sm group-hover:text-teal-200 transition-colors">
                            {transaction.transDetailes}
                          </div>
                          <div className="text-xs text-white/40 mt-0.5 hidden lg:block">
                            {transaction.category?.icon} {transaction.category?.name || 'Uncategorized'}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className={`font-bold text-sm ${
                            transaction.type === 'CREDIT' ? 'text-teal-400' : 'text-rose-400'
                          }`}>
                            {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <div className="font-medium text-white/80 text-sm">{formatDate(transaction.transdate)}</div>
                          <div className="text-xs text-white/40">{formatTime(transaction.transdate)}</div>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            transaction.type === 'CREDIT'
                              ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {transaction.type === 'CREDIT' ? '↑ CREDIT' : '↓ DEBIT'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <div className="text-sm text-white/60">
                            {transaction.category?.icon} {transaction.category?.name || 'Uncategorized'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-4">
                {currentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{transaction.transDetailes}</p>
                        <p className="text-xs text-white/40 mt-1 truncate">
                          {transaction.category?.icon} {transaction.category?.name || 'Uncategorized'}
                        </p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border ${
                        transaction.type === 'CREDIT'
                          ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-white/40">{formatDate(transaction.transdate)}</span>
                      <span className={`font-bold text-sm ${
                        transaction.type === 'CREDIT' ? 'text-teal-400' : 'text-rose-400'
                      }`}>
                        {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="border-t border-white/10 px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/5">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="bg-white/10 border border-white/20 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-teal-400"
                  >
                    <option value={10} className="bg-slate-800">10</option>
                    <option value={25} className="bg-slate-800">25</option>
                    <option value={50} className="bg-slate-800">50</option>
                  </select>
                  <span className="hidden sm:inline">per page</span>
                </div>

                <div className="text-xs text-white/40">
                  Showing {startIndex + 1}–{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg border border-white/20 text-white/60 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    if (totalPages <= 5 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2.5 py-1 rounded-lg transition-all text-xs ${
                            currentPage === page
                              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                              : 'text-white/50 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-1 text-white/30 text-xs">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg border border-white/20 text-white/60 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTransactions;