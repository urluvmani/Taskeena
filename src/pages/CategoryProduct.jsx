import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SEO from "../components/More/SEO";
import { useCart } from "../components/context/Cart";
import { useAuth } from "../components/context/authContext";
import { Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

const CategoryProduct = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const [error, setError] = useState(null);
    const {  addToCart } = useCart(); // ✅ using new addToCart helper
  
  const navigate = useNavigate();
  const params = useParams();

  // ✅ Helper: parse MongoDB price objects
  const parsePrice = (p) => {
    if (p == null) return null;
    if (typeof p === "object") {
      if (p.$numberInt) return Number(p.$numberInt);
      if (p.$numberDecimal) return Number(p.$numberDecimal);
      if (p.$numberLong) return Number(p.$numberLong);
    }
    return Number(p);
  };

    const handleAddToCart = (product) => {
    if (!auth?.token) return navigate("/login");
    addToCart(product);
  };


  const formatCurrency = (value) => {
    if (value == null || Number.isNaN(Number(value))) return "—";
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // ✅ Fetch products by category
  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/category-product/${params.slug}`
      );
      setCategory(data?.category ?? {});
      setProducts(data?.products ?? []);
    } catch (err) {
      console.error(err);
      setError("Products ko load karte waqt masla aya.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);

  return (
    <>
      {/* ✅ SEO Tags */}
      <SEO
        title={`${category?.name || "Category"} | Taskeena Beauty`}
        description={`Explore ${category?.name || "our"} beauty and wellness products from Taskeena Beauty.`}
        keywords={`${category?.name || "beauty"}, skincare, wellness, Taskeena, category products`}
      />
<Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 py-10 px-4 md:px-10">
        <header className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-emerald-700 mb-2 drop-shadow-sm">
            {category?.name ?? "Category"}
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            {loading
              ? "Loading products..."
              : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
          </p>
        </header>

        {/* ⚠️ Error display */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* ✅ Product Grid */}
        <section className="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-2">
          {/* Loading skeletons */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-5 w-full max-w-[280px]"
              >
                <div className="h-48 bg-slate-100 rounded-lg mb-4" />
                <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-1/2 mb-2" />
                <div className="h-8 bg-slate-100 rounded w-full mt-4" />
              </div>
            ))}

          {!loading && products.length === 0 && (
            <div className="col-span-full text-center text-slate-500 py-12 text-lg">
              No products found in this category.
              <Link  to="/"><p className="text-xl p-2 bg-pink-400 text-white font-bold rounded-md shadow-2xl">Go to Home Page </p></Link>
            </div>
          )}

          {/* ✅ Product Cards */}
       {!loading &&
                products.map((product, index) => {
                  const rawPrice = parsePrice(product?.price);
                  const priceText = formatCurrency(rawPrice);
                  const discounted =
                    product.discountPercent > 0
                      ? rawPrice - (rawPrice * product.discountPercent) / 100
                      : rawPrice;

                  return (
                    <article
                      key={`${product?._id ?? product?.id ?? "product"}-${index}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition shadow-emerald-200"
                    >
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                          loading="lazy"
                          alt={product?.name ?? "product"}
                          className="w-full object-center md:h-52 object-contain hover:scale-105 transition-transform"
                        />
                        {/* Stock or Discount badge */}
                        {product.discountPercent > 0 ? (
                          <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs md:font-bold md:px-2 md:py-1 p-1 rounded-lg shadow">
                            {product.discountPercent}% OFF
                          </span>
                        ) : (
                          <span className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-rose-500 text-white text-xs  px-2 py-1 rounded-xl shadow">
                            {parseInt(
                              product?.quantity?.$numberInt ?? product?.quantity
                            ) > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
                        )}
                      </div>

                      <div className="px-3 py-2">
                        <h3 className="md:font-semibold md:text-lg text-xs line-clamp-1 text-emerald-800 uppercase">
                          {product?.name}
                        </h3>
                        <p className="text-sm hidden text-slate-500 line-clamp-1">
                          {product?.description ?? "No description available."}
                        </p>

                        <div className="">
                          {product.discountPercent > 0 ? (
                            <div>
                              <span className="line-through text-gray-400 text-sm">
                                Rs. {rawPrice}
                              </span>
                              <div className="text-rose-500 text-sm md:text-lg font-bold">
                                Rs. {discounted.toFixed(0)} (
                                {product.discountPercent}% OFF)
                              </div>
                            </div>
                          ) : (
                            <div className="md:text-xl text-base font-bold text-emerald-700">
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
                    </article>
                  );
                })}
        </section>
      </div>
    </>
  );
};

export default CategoryProduct;
