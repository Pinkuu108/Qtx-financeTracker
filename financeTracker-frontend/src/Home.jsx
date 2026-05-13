import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [activePage, setActivePage] = useState("add"); // "add" or "history"

  const [form, setForm] = useState({
    amount: "",
    transdate: "",
    transDetailes: ""
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      fetchTransactions();
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/transactions/${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveTransaction = async () => {
    try {
      const response = await axios.post("http://localhost:8080/save", {
        userId: userId,
        amount: form.amount,
        transdate: form.transdate,
        transDetailes: form.transDetailes
      });
      alert(response.data);
      setForm({ amount: "", transdate: "", transDetailes: "" });
      fetchTransactions();
    } catch (error) {
      console.log(error);
      alert("Transaction Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
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
            activePage === "add" ? "bg-white text-green-700 font-bold" : "hover:bg-green-600"
          }`}
        >
          ➕ Add Transaction
        </button>

        <button
          onClick={() => { setActivePage("history"); fetchTransactions(); }}
          className={`flex items-center gap-3 p-3 rounded-lg transition text-left ${
            activePage === "history" ? "bg-white text-green-700 font-bold" : "hover:bg-green-600"
          }`}
        >
          📋 Show Transactions
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Finance Tracker</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Page Content */}
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
              <button
                onClick={saveTransaction}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
              >
                Save Transaction
              </button>
            </div>
          )}

          {/* Transaction History */}
          {activePage === "history" && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Transaction History</h2>
              {transactions.length === 0 ? (
                <p className="text-gray-400 text-center">No transactions yet</p>
              ) : (
                transactions.map((t) => (
                  <div key={t.id} className="border-b py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-700">{t.transDetailes}</p>
                      <p className="text-sm text-gray-400">{t.transdate}</p>
                    </div>
                    <p className="text-green-600 font-bold">₹{t.amount}</p>
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