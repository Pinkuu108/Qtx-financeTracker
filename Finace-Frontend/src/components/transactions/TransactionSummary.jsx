const TransactionSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'CREDIT')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'DEBIT')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const cards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      gradient: 'from-emerald-500 to-teal-500',
      icon: '📈',
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      gradient: 'from-rose-500 to-pink-500',
      icon: '📉',
    },
    {
      title: 'Net Balance',
      amount: balance,
      gradient: 'from-indigo-600 to-purple-600',
      icon: '💰',
      arrow: balance >= 0 ? '↑' : '↓',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card) => (
        <div key={card.title} className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-6 shadow-xl text-white`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-white/80">{card.title}</p>
            <span className="text-3xl">{card.icon}</span>
          </div>
          <p className="text-3xl font-black mb-1">
            ₹{card.amount.toFixed(2)}
          </p>
          {card.arrow && (
            <span className="text-sm font-semibold text-white/80">{card.arrow} {balance >= 0 ? 'Positive' : 'Negative'}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionSummary;
