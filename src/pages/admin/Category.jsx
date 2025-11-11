import { useEffect, useState } from "react";
import CategoryForm from "../../components/form/CategoryForm";
import axios from "axios";
import { useAuth } from "../../components/context/authContext";
import toast, { Toaster } from "react-hot-toast"; // ✅ include Toaster

const Category = () => {
  const { auth } = useAuth();
  const [name, setname] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      const token = auth?.token;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/category/create-category`,
        { name },
        { headers: { Authorization: token } }
      );

      if (res.data?.success) {
        toast("✅ Category added successfully!");
        getAllCategory();
        setname("");
      }
    } catch (error) {
      console.log(error);
      toast("⚠️ Failed to create category");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.AllCategory);
    } catch (error) {
      toast("⚠️ Something went wrong while fetching categories");
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const token = auth?.token;
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/category/delete-category/${id}`,
        { headers: { Authorization: token } }
      );
      getAllCategory();
    } catch (error) {
      toast("❌ Error deleting category");
    }
  };

  const openEditModal = (category) => {
    setEditId(category._id);
    setEditName(category.name);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = auth?.token;
      const res = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/category/update-category/${editId}`,
        { name: editName },
        { headers: { Authorization: token } }
      );
      if (res.data?.success) {
        toast("✅ Category updated successfully!");
        setShowModal(false);
        setEditId(null);
        setEditName("");
        getAllCategory();
      } else {
        toast("⚠️ Failed to update category");
      }
    } catch (error) {
      console.log(error);
      toast("❌ Error updating category");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-5">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Manage Categories
        </h1>

        {/* Create Form */}
        <form
          onSubmit={handleCategory}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full sm:w-2/3 bg-gray-50 border border-gray-400 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter new category"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-md font-medium transition-all"
          >
            Add
          </button>
        </form>

        {/* Category List */}
        <div className="mt-4">
          <div className="flex justify-between text-gray-600 font-semibold px-2 py-2 border-b text-sm sm:text-base">
            <span>Name</span>
            <span>Actions</span>
          </div>

          <div className="divide-y divide-gray-200">
            {categories.length ? (
              categories.map((c) => (
                <div
                  key={c._id}
                  className="flex justify-between items-center py-3 px-2 hover:bg-gray-100 transition-all text-sm sm:text-base"
                >
                  <span className="text-gray-800 font-medium truncate">
                    {c.name}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(c)}
                      className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(c._id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center text-gray-500 text-lg mt-4">
                No Categories Found
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-80 shadow-lg animate-fadeIn">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-3">
              Edit Category
            </h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-400 p-2 rounded-md mb-4 text-gray-800 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="Enter new name"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
