import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/context/authContext";
import toast, { Toaster } from "react-hot-toast"; // ✅ include Toaster


const UpdateProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0); // ✅ NEW
  const [quantity, setquantity] = useState(0);
  const [category, setcategory] = useState("");
  const [status, setstatus] = useState(1);
  const [photo, setphoto] = useState("");
  const [value, setvalue] = useState([]);
  const [product, setproduct] = useState([]);

  // ✅ Fetch Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${slug}`
      );
      if (data?.product) {
        const p = data.product;
        setproduct(p);
        setname(p.name);
        setdescription(p.description);
        setprice(p.price);
        setDiscountPercent(p.discountPercent || 0); // ✅ NEW
        setquantity(p.quantity);
        setcategory(p.category);
        setstatus(p.status);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // ✅ Fetch Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) setvalue(data.AllCategory);
    } catch {
      toast("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // ✅ Update Handler
  const HandleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("discountPercent", discountPercent); // ✅ NEW
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("status", status);
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-update/${product._id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        toast("✅ Product Updated Successfully!");
        const p = data.products;
        setproduct(p);
        setname(p.name);
        setdescription(p.description);
        setprice(p.price);
        setDiscountPercent(p.discountPercent || 0);
        setquantity(p.quantity);
        setcategory(p.category);
        setstatus(p.status);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ✅ Delete Product
  const DeleteProduct = async () => {
    try {
      if (!confirm("Are you sure you want to delete this product?")) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/product/delete-product/${product._id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
            <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Update Product
      </h2>

      <form
        className="flex flex-col gap-4 bg-white text-black p-6 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={HandleUpdate}
      >
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
            type="text"
            placeholder="Enter Name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
            placeholder="Enter Description"
            rows={3}
            required
          />
        </div>

        {/* Price + Discount + Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1">Price (Rs)</label>
            <input
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="bg-white text-black  border border-gray-300 rounded-md px-3 py-2 w-full"
              type="number"
              placeholder="Enter Price"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Discount (%)</label>
            <input
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
              type="number"
              min="0"
              max="100"
              placeholder="e.g. 10"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
              className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
              type="number"
              placeholder="Enter Quantity"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          >
            <option value="">Select Category</option>
            {value.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Availability</label>
          <select
            value={status}
            onChange={(e) => setstatus(Number(e.target.value))}
            className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value={1}>Available</option>
            <option value={0}>Not Available</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Product Image</label>
          <input
            onChange={(e) => setphoto(e.target.files[0])}
            className="bg-white text-black border border-gray-300 rounded-md px-3 py-2 w-full"
            type="file"
          />
          {product && (
            <img
              className="w-32 h-32 object-cover mt-3 rounded-md border"
              src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
              alt="product"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium"
        >
          Update Product
        </button>
      </form>

      <button
        onClick={DeleteProduct}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-4"
      >
        Delete Product
      </button>
    </div>
  );
};

export default UpdateProduct;
