import React, { useEffect, useState } from "react";
import { useAuth } from "../../components/context/authContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // ✅ include Toaster

const CreateProduct = () => {
  const { auth } = useAuth();
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0); // ✅ NEW
  const [quantity, setquantity] = useState("");
  const [category, setcategory] = useState("");
  const [status, setstatus] = useState(1);
  const [photo, setphoto] = useState(null);
  const [categories, setcategories] = useState([]);

  // ✅ Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) setcategories(data?.AllCategory);
    } catch {
      toast("⚠️ Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("discountPercent", discountPercent);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("status", status);
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast("✅ Product Created Successfully!");
        setname("");
        setdescription("");
        setprice("");
        setDiscountPercent(0);
        setquantity("");
        setcategory("");
        setphoto(null);
        setstatus(1);
      }
    } catch (error) {
      toast("❌ Error creating product");
    }
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
              rows={3}
              className="w-full border rounded-md px-3 py-2 resize-none"
              placeholder="Enter description"
            />
          </div>

          {/* Price + Discount + Quantity */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Price (Rs)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setprice(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2"
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Discount (%)</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                min="0"
                max="100"
                className="w-full border rounded-md px-3 py-2"
                placeholder="e.g. 10"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setquantity(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2"
                placeholder="Qty"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Photo */}
          <div>
            <label className="block font-medium mb-1">Product Image</label>
            <input
              onChange={(e) => setphoto(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-full border rounded-md px-3 py-2"
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                className="h-32 mt-3 rounded-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
