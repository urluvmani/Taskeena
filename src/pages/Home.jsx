import React, { useEffect, useState } from "react";
import SEO from "../components/More/SEO";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../components/context/Cart.jsx";
import { useAuth } from "../components/context/authContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { Sparkles, Shield, Truck, Heart } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const parsePrice = (p) => {
    if (p == null) return null;
    if (typeof p === "object") {
      if (p.$numberInt) return Number(p.$numberInt);
      if (p.$numberDecimal) return Number(p.$numberDecimal);
      if (p.$numberLong) return Number(p.$numberLong);
    }
    return Number(p);
  };

  const formatCurrency = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "—";
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getTotal = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/product/product-count`
    );
    setTotal(data?.total);
  };

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-page/${page}`
      );
      setProducts(data?.products);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-page/${page}`
      );
      setProducts([...products, ...data?.products]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page !== 1) loadMore();
  }, [page]);

  const getAllCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
    );
    setCategories(data?.AllCategory);
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else getAllProducts();
  }, [checked, radio]);

  useEffect(() => {
    getTotal();
    getAllCategories();
  }, []);

  const setFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  const filterProduct = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`,
      { checked, radio }
    );
    if (data?.success) setProducts(data?.products);
  };

  const handleAddToCart = (product) => {
    if (!auth?.token) {
      toast.error("Please log in first to add products to cart.");
      return navigate("/login");
    }

    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <>
      <SEO
        title="Taskeena Beauty – Glow Inside & Out"
        description="Explore premium skincare, wellness, and medicated essentials for a healthier, radiant you."
        keywords="skincare, wellness, supplements, medicated products, Taskeena"
      />

      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-gray-50">
        {/* HERO SECTION */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="text-yellow-200" size={16} />
                <span className="text-white text-sm font-medium tracking-wide">
                  Premium Beauty & Wellness
                </span>
                <Sparkles className="text-yellow-200" size={16} />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Beauty Meets <span className="text-yellow-200">Wellness</span>
              </h1>

              <p className="max-w-2xl mx-auto text-white/90 text-base md:text-lg lg:text-xl mb-8 leading-relaxed">
                Discover dermatologically tested skincare and self-care essentials
                made to nourish, heal, and glow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    window.scrollBy({
                      top: window.innerHeight * 0.8,
                      behavior: "smooth",
                    })
                  }
                  className="btn-shine px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-base md:text-lg shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  Shop Now
                </button>
                <Link
                  to="/collections/all"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base md:text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  View Collections
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FILTER + PRODUCT GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT FILTER PANEL */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:w-72 w-full bg-white rounded-2xl shadow-lg p-6 space-y-8 border border-gray-100"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                  Categories
                </h2>
                <div className="flex flex-col space-y-3">
                  {categories.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => setFilter(e.target.checked, c._id)}
                      className="!text-black text-black font-medium cursor-pointer"
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                  Price Range
                </h2>
                <div className="flex flex-col space-y-3">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col gap-3">
                    {Prices.map((p) => (
                      <Radio
                        key={p._id}
                        value={p.array}
                        className="!text-black text-black font-medium cursor-pointer"
                      >
                        {p.name}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
                <button
                  onClick={() => {
                    setChecked([]);
                    setRadio([]);
                    getAllProducts();
                    toast("Filters cleared");
                  }}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>

            {/* RIGHT PRODUCT GRID */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                  Featured Products
                </h2>
                <p className="text-gray-500 text-base md:text-lg">
                  Curated to care for your body, skin, and mind
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {loading &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="aspect-square bg-gray-100 shimmer" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-100 rounded shimmer" />
                        <div className="h-3 bg-gray-100 rounded w-2/3 shimmer" />
                        <div className="h-8 bg-gray-100 rounded shimmer" />
                      </div>
                    </div>
                  ))}

                {!loading && products.length === 0 && (
                  <div className="col-span-full text-center py-16">
                    <div className="text-gray-400 text-lg">No products found</div>
                    <button
                      onClick={() => {
                        setChecked([]);
                        setRadio([]);
                        getAllProducts();
                      }}
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {!loading &&
                  products.map((product, index) => {
                    const rawPrice = parsePrice(product?.price);
                    const priceText = formatCurrency(rawPrice);
                    const discounted =
                      product.discountPercent > 0
                        ? rawPrice - (rawPrice * product.discountPercent) / 100
                        : rawPrice;

                    return (
                      <motion.article
                        key={`${product?._id ?? product?.id ?? "product"}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => navigate(`/details/${product.slug}`)}
                        className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-100"
                      >
                        <div className="relative group img-zoom">
                          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                              loading="lazy"
                              alt={product?.name ?? "product"}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          {product.discountPercent > 0 ? (
                            <span className="badge-pulse absolute top-3 right-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                              {product.discountPercent}% OFF
                            </span>
                          ) : (
                            <span className="absolute top-3 left-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg">
                              {parseInt(
                                product?.quantity?.$numberInt ?? product?.quantity
                              ) > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </span>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 line-clamp-1 mb-2 text-sm md:text-base">
                            {product?.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                            {product?.description ?? "No description available."}
                          </p>

                          <div className="mb-3">
                            {product.discountPercent > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="line-through text-gray-400 text-sm">
                                  {priceText}
                                </span>
                                <span className="text-secondary-600 font-bold text-lg">
                                  PKR {discounted.toFixed(0)}
                                </span>
                              </div>
                            ) : (
                              <div className="text-primary-600 font-bold text-lg">
                                {priceText}
                              </div>
                            )}
                          </div>

                        <div className="flex items-center gap-2 justify-between md:justify-center py-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className={`md:px-3 py-2 px-2 text-sm rounded-lg font-medium shadow-sm border ${
                              parseInt(
                                product?.quantity?.$numberInt ?? product?.quantity
                              ) <= 0
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
                                : "bg-white text-emerald-700 hover:bg-emerald-50"
                            }`}
                            disabled={
                              parseInt(
                                product?.quantity?.$numberInt ?? product?.quantity
                              ) <= 0
                            }
                          >
                            Buy now
                          </button>

                          <button
                            className="md:px-3 px-2 py-2 text-sm rounded-lg bg-emerald-600 text-white font-medium shadow hover:shadow-md"
                            onClick={() => navigate(`/details/${product.slug}`)}
                          >
                            View
                          </button>
                        </div>
                        </div>
                      </motion.article>
                    );
                  })}
              </div>

              {/* LOAD MORE */}
              <div className="text-center mt-12">
                {products?.length < total && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                      toast("Loading more products...");
                    }}
                    className="btn-shine px-10 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                  >
                    {loading ? "Loading..." : "Load More Products"}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* FOOTER CTA */}
        {!auth?.token && (
          <section className="mx-4 mb-8">
            <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 rounded-3xl py-12 md:py-16 px-6 text-center text-white shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Join Taskeena Wellness Circle 🌿
                </h2>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto text-base md:text-lg">
                  Sign up to receive beauty tips, exclusive discounts, and early
                  access to new care lines!
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="btn-shine px-8 py-4 bg-white text-primary-600 rounded-full font-semibold shadow-2xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  Sign Up Now
                </button>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;