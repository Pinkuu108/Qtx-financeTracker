import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, updateUserStatus } from "../services/adminService";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const handleToggleStatus = async (id, active) => {
    await updateUserStatus(id, !active);
    fetchUsers();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <button onClick={() => navigate("/admin")}
          className="p-3 rounded-lg hover:bg-blue-600 text-left">🏠 Dashboard</button>
        <button onClick={() => navigate("/admin/categories")}
          className="p-3 rounded-lg hover:bg-blue-600 text-left mt-2">🏷️ Categories</button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Manage Users</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.fullName}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      u.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleToggleStatus(u.id, u.active)}
                      className={`px-3 py-1 rounded text-white text-sm ${
                        u.active ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}>
                      {u.active ? "Deactivate" : "Activate"}
                    </button>
                    <button onClick={() => handleDelete(u.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;