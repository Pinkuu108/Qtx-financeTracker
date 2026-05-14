import { useState, useEffect } from "react";
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from "../services/categoryService";
import { useNavigate } from "react-router-dom";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", icon: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    try {
      setError("");
      setSuccess("");

      if (!form.name || !form.icon) {
        setError("Please fill in both name and icon");
        return;
      }

      if (editId !== null) {
        // ✅ editId is a number like 1, 2, 3
        await updateCategory(editId, { name: form.name, icon: form.icon });
        setSuccess("Category updated!");
      } else {
        await addCategory({ name: form.name, icon: form.icon });
        setSuccess("Category added!");
      }

      setForm({ name: "", icon: "" });
      setEditId(null);
      fetchCategories();
    } catch (e) {
      console.log(e);
      setError("Failed to save category");
    }
  };

  const handleEdit = (c) => {
    // ✅ store only the id number, not the whole object
    setEditId(c.id);
    setForm({ name: c.name, icon: c.icon });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      setSuccess("");
      await deleteCategory(id);
      setSuccess("Category deleted!");
      fetchCategories();
    } catch (e) {
      console.log(e);
      setError("Failed to delete category");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: "", icon: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
        <button onClick={() => navigate("/admin")}
          className="p-3 rounded-lg hover:bg-blue-600 text-left mb-2">
          🏠 Dashboard
        </button>
        <button onClick={() => navigate("/admin/users")}
          className="p-3 rounded-lg hover:bg-blue-600 text-left">
          👥 Users
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Manage Categories</h2>

        {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}
        {success && <p className="text-green-500 mb-4 font-semibold">{success}</p>}

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="flex-1 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Icon (emoji)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-36 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            {editId !== null ? "Update" : "Add"}
          </button>
          {editId !== null && (
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-3 rounded-lg hover:bg-gray-500 transition">
              Cancel
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="p-3 text-left">Icon</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-2xl">{c.icon}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3 text-gray-400 text-sm">{c.id}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                        Delete
                      </button>
                    </div>
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

export default ManageCategories;