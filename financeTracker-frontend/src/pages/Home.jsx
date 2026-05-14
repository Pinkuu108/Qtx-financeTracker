import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTransaction, getTransactions } from "../services/transactionService";
import { getAllCategories } from "../services/categoryService";
import { logoutUser } from "../services/authService";

function Home() {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [activePage, setActivePage] = useState("add");
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    transdate: "",
    transDetailes: "",
    categoryId: "",
    type: ""
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions(userId);
      setTransactions(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (!form.amount || !form.transdate || !form.categoryId || !form.type) {
        alert("Please fill all fields");
        return;
      }

      // ✅ datetime-local gives "2024-01-15T10:30" — we need "2024-01-15T10:30:00"
      const transdateFormatted = form.transdate.length === 16
        ? form.transdate + ":00"
        : form.transdate;

      const payload = {
        userId: parseInt(userId),
        amount: parseFloat(form.amount),
        transdate: transdateFormatted,
        transDetailes: form.transDetailes,
        categoryId: parseInt(form.categoryId),
        type: form.type                        // ✅ sends "CREDIT" or "DEBIT"
      };

      const res = await saveTransaction(payload);
      alert(res.data);
      setForm({ amount: "", transdate: "", transDetailes: "", categoryId: "", type: "" });
      fetchTransactions();
    } catch (e) {
      console.log(e);
      alert("Transaction Failed");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.log(e);
    }
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Menu</h2>
        <button
          onClick={() => setActivePage("add")}
          className={`flex items-center gap-3 p-3 rounded-lg mb-3 transition text-left ${
            activePage === "add"
              ? "bg-white text-green-700 font-bold"
              : "hover:bg-green-600"
          }`}>
          ➕ Add Transaction
        </button>
        <button
          onClick={() => { setActivePage("history"); fetchTransactions(); }}
          className={`flex items-center gap-3 p-3 rounded-lg transition text-left ${
            activePage === "history"
              ? "bg-white text-green-700 font-bold"
              : "hover:bg-green-600"
          }`}>
          📋 Transactions
        </button>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 transition text-left font-semibold">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Finance Tracker</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">

          {/* Add Transaction */}
          {activePage === "add" && (
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Add Transaction</h2>

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                type="datetime-local"
                name="transdate"
                value={form.transdate}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-400"
              />

              <input
                type="text"
                name="transDetailes"
                placeholder="Details"
                value={form.transDetailes}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-400"
              />

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-400">
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-400">
                <option value="">Select Type</option>
                <option value="CREDIT">💰 INCOME</option>  {/* ✅ matches enum */}
                <option value="DEBIT">💸 EXPENSE</option>  {/* ✅ matches enum */}
              </select>

              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold">
                Save Transaction
              </button>
            </div>
          )}

          {/* Transaction History */}
          {activePage === "history" && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Transaction History</h2>
              {transactions.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No transactions yet</p>
              ) : (
                transactions.map((t) => (
                  <div key={t.id} className="border-b py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-700">{t.transDetailes}</p>
                      <p className="text-sm text-gray-400">{t.transdate}</p>
                      <p className="text-sm text-blue-500">{t.category?.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                        t.type === "CREDIT"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {t.type === "CREDIT" ? "INCOME" : "EXPENSE"}  {/* ✅ friendly label */}
                      </span>
                    </div>
                    <p className={`font-bold text-lg ${
                      t.type === "CREDIT" ? "text-green-600" : "text-red-600"
                    }`}>
                      ₹{t.amount}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Home;