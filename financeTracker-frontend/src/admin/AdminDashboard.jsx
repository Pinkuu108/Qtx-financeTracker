import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

function AdminDashboard() {
  const navigate = useNavigate();

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
      <div className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <button onClick={() => navigate("/admin/users")}
          className="flex items-center gap-3 p-3 rounded-lg mb-3 hover:bg-blue-600 transition text-left">
          👥 Manage Users
        </button>
        <button onClick={() => navigate("/admin/categories")}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 transition text-left">
          🏷️ Manage Categories
        </button>

        {/* Logout at bottom of sidebar */}
        <div className="mt-auto">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 transition text-left font-semibold">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Finance Tracker — Admin</h1>
          <button onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Welcome, Admin!</h2>
          <div className="grid grid-cols-2 gap-6">
            <div onClick={() => navigate("/admin/users")}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-700">👥 Manage Users</h3>
              <p className="text-gray-400 mt-2">View, activate, deactivate or delete users</p>
            </div>
            <div onClick={() => navigate("/admin/categories")}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-gray-700">🏷️ Manage Categories</h3>
              <p className="text-gray-400 mt-2">Add, edit or delete transaction categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;