import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // ✅ Get total product count
  const getTotal = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-count`);
    setTotal(data?.total || 0);
  };

  // ✅ Get first page of products
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-page/${page}`);
      if (data?.success) setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load more products on next pages
  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-page/${page}`);
      if (data?.success) setProducts([...products, ...data.products]);
    } catch (err) {
      console.error("Error loading more products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Trigger loadMore when page number changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // ✅ Initial load
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  return (
    <div className="bg-neutral-300 w-full min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        All Products ({products.length}/{total})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {products.map((product, index) => {
          const discount = product.discountPercent || 0;
          const discountedPrice = product.price - (product.price * discount) / 100;

          return (
            <Link key={`${product._id}-${index}`} to={`/dashboard/admin/product/${product.slug}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="card bg-white rounded-xl shadow-md overflow-hidden relative"
              >
                {/* ===== Product Image ===== */}
                <div className="img w-full h-40 md:h-48 bg-gray-100 relative">
                  <img
                    className="object-cover w-full h-full"
                    src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                  />

                  {/* 🔖 Discount Badge */}
                  {discount > 0 && (
                    <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* ===== Product Info ===== */}
                <div className="content p-3 text-gray-800">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

                  {/* 💰 Price Display */}
                  <div className="mt-2">
                    {discount > 0 ? (
                      <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-sm">
                          Rs. {product.price}
                        </span>
                        <span className="text-rose-500 font-bold">
                          Rs. {discountedPrice.toFixed(0)} ({discount}% OFF)
                        </span>
                      </div>
                    ) : (
                      <span className="text-emerald-700 font-bold">
                        Rs. {product.price}
                      </span>
                    )}
                  </div>

                  {/* Stock Info */}
                  <div className="text-xs text-gray-500 mt-1">
                    In stock ({product.quantity ?? 0})
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* LOAD MORE BUTTON */}
      {products.length < total && (
        <div className="text-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPage(page + 1)}
            className="bg-gradient-to-r from-emerald-500 to-rose-400 text-white py-3 px-10 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {loading ? "Loading..." : "Load More"}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
