import { useState, useEffect } from 'react';
import { getCategories } from '../../api/categories';
import { createCategory, updateCategory, deleteCategory } from '../../api/admin';
import Spinner from '../ui/Spinner';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', icon: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        await updateCategory(editingId, formData);
        setEditingId(null);
      } else {
        await createCategory(formData);
      }
      setFormData({ name: '', icon: '' });
      fetchCategories();
    } catch (err) {
      setError('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ name: category.name, icon: category.icon });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', icon: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span>📁</span> Category Management
      </h2>

      {error && (
        <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 text-xs">
          {error}
        </div>
      )}

      {/* Add/Edit Category Form - Moved to top */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <h3 className="text-base font-bold text-gray-900 mb-3">
          {editingId ? '✏️ Edit Category' : '➕ Add New Category'}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-end">
          <div className="flex-shrink-0 w-full sm:w-20">
            <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="📝"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-all duration-200 text-center text-xl"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-gray-600 mb-1">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Groceries, Rent, Salary"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-all duration-200 text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all duration-200 hover:scale-105 text-sm"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories List/Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Row */}
        <div className="bg-gray-50 border-b border-gray-100 py-2.5 px-4 grid grid-cols-12 gap-2">
          <div className="col-span-2 sm:col-span-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Icon
          </div>
          <div className="col-span-8 sm:col-span-9 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Name
          </div>
          <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
            Actions
          </div>
        </div>

        {/* Category Rows */}
        <div className="divide-y divide-gray-100">
          {categories.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No categories yet. Add your first category below.
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="py-2.5 px-4 grid grid-cols-12 gap-2 items-center hover:bg-gray-50 transition-all duration-200"
              >
                {/* Icon in colored circle */}
                <div className="col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-base">
                    {category.icon}
                  </div>
                </div>

                {/* Category Name */}
                <div className="col-span-8 sm:col-span-9">
                  <span className="text-sm font-semibold text-gray-800">{category.name}</span>
                </div>

                {/* Action Buttons */}
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
