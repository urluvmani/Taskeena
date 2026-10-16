import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "../components/More/SEO";
import { useCart } from "../components/context/Cart";
import { Star, ArrowLeft, ShoppingCart, Package, Shield, Truck } from "lucide-react";
import { useAuth } from "../components/context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { addToCart } = useCart();
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${
          params.slug
        }`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product?._id, data?.product?.category);
    } catch (error) {
      console.log("Error fetching product details:", error);
    }
  };

  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/product/related-products/${pid}/${cid}`
      );
      if (data?.success) setRelatedProducts(data?.relatedproducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.AllCategory);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchReviews = async () => {
    if (!product?._id) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/review/${product._id}`
      );
      setReviews(data || []);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/review/add/${product._id}`,
        { rating, comment },
        { headers: { Authorization: auth?.token } }
      );
      if (data?.success) {
        toast.success("Review added successfully!");
        setComment("");
        setRating(5);
        fetchReviews();
      } else toast.error(data?.message || "Failed to add review");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "You can only review purchased products"
      );
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProductDetails();
      getAllCategories();
    }
  }, [params?.slug]);

  useEffect(() => {
    if (product?._id) {
      fetchReviews();
    }
  }, [product?._id, auth?.token]);

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-500 bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading product details...</p>
      </div>
    );
  }

  const renderStars = (value) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < value ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }
      />
    ));

  return (
    <>
      <SEO
        title={`${product?.name} | Taskeena Beauty`}
        description={
          product?.description?.substring(0, 160) ||
          "Discover premium beauty, skincare, and wellness essentials at Taskeena Beauty."
        }
      />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary-600 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex items-center justify-center border border-gray-100"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                alt={product?.name}
                loading="lazy"
                className="w-full max-w-lg object-contain"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  {renderStars(Math.round(product.avgRating || 0))}
                  <span className="text-gray-500 text-sm">
                    ({product.numReviews || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 md:p-6">
                {product.discountPercent > 0 ? (
                  <div>
                    <span className="line-through text-gray-400 text-lg">
                      PKR {product.price}
                    </span>
                    <div className="text-2xl md:text-3xl font-bold text-secondary-600 mt-1">
                      PKR {(
                        product.price -
                        (product.price * product.discountPercent) / 100
                      ).toFixed(0)}
                      <span className="text-sm md:text-base font-normal text-secondary-500 ml-2">
                        ({product.discountPercent}% OFF)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">
                    PKR {product.price}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Package size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">Category</span>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {categories.find((c) => c._id === product.category)?.name || "Unknown"}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Shield size={18} className="text-primary-500" />
                    <span className="text-sm font-medium">Stock</span>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {parseInt(product?.quantity?.$numberInt ?? product?.quantity) > 0
                      ? `${product.quantity} in stock`
                      : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg text-sm text-primary-700">
                  <Truck size={16} />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg text-sm text-primary-700">
                  <Shield size={16} />
                  <span>Dermatologist Tested</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  if (auth?.token) {
                    addToCart(product);
                    toast.success("Product added to cart");
                  } else navigate("/login");
                }}
                disabled={parseInt(product?.quantity?.$numberInt ?? product?.quantity) <= 0}
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                  parseInt(product?.quantity?.$numberInt ?? product?.quantity) <= 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/30"
                }`}
              >
                <ShoppingCart size={20} />
                {parseInt(product?.quantity?.$numberInt ?? product?.quantity) <= 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 text-gray-700 leading-relaxed">
                  {product.description || "No description available."}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reviews List */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 max-h-[600px] overflow-y-auto">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <div
                      key={r._id}
                      className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{r.user?.name}</p>
                        <div className="flex items-center gap-1">
                          {renderStars(r.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              {auth?.token ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-900 mb-2">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                          {r} Star{r > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-900 mb-2">Your Review</label>
                    <textarea
                      placeholder="Share your experience with this product..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Please login to submit a review</p>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
          {relatedProducts?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No related products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => {
                const hasDiscount = p.discountPercent > 0;
                const discountedPrice = hasDiscount
                  ? p.price - (p.price * p.discountPercent) / 100
                  : p.price;

                return (
                  <motion.div
                    key={p._id}
                    className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
                    onClick={() => navigate(`/details/${p.slug}`)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2">{p.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {p.description?.substring(0, 80)}...
                      </p>
                      <div className="mb-3">
                        {hasDiscount ? (
                          <div>
                            <span className="line-through text-gray-400 text-sm">
                              PKR {p.price}
                            </span>
                            <div className="text-secondary-600 font-bold">
                              PKR {discountedPrice.toFixed(0)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-primary-600 font-bold">PKR {p.price}</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (auth?.token) {
                              addToCart(p);
                              toast.success("Product added to cart");
                            } else navigate("/login");
                          }}
                          disabled={parseInt(p?.quantity?.$numberInt ?? p?.quantity) <= 0}
                          className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${
                            parseInt(p?.quantity?.$numberInt ?? p?.quantity) <= 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50"
                          }`}
                        >
                          Add
                        </button>
                        <button className="flex-1 py-2 rounded-lg font-medium text-sm bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg transition-all">
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
