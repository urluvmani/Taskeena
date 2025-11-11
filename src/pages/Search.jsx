import React from "react";
import { useSearch } from "../components/context/searchcontext";
import { useNavigate } from "react-router-dom";
import SEO from "../components/More/SEO"; // ✅ Added SEO component

const Search = () => {
  const { search } = useSearch();
  const navigate = useNavigate();

  const resultCount = search?.results?.length || 0;

  return (
    <>
      {/* ✅ SEO OPTIMIZATION */}
      <SEO
        title={
          resultCount > 0
            ? `Search Results (${resultCount}) | Taskeena Beauty`
            : "No Results Found | Taskeena Beauty"
        }
        description={
          resultCount > 0
            ? `Explore ${resultCount} matching products from Taskeena Beauty. Find skincare, wellness, and medicated essentials to glow inside & out.`
            : "No matching products found. Try searching again for skincare, wellness, or beauty items from Taskeena Beauty."
        }
        keywords="search, Taskeena Beauty, skincare, wellness, medicated products, beauty products, Taskeena"
      />

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-emerald-50 py-10 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-emerald-700 mb-2 drop-shadow-sm">
            Search Results
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {resultCount > 0
              ? `Found ${resultCount} product${resultCount > 1 ? "s" : ""}`
              : "No results found for your query."}
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          {search?.results?.map((p) => (
            <article
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-[280px] flex flex-col overflow-hidden cursor-pointer border border-emerald-100 hover:-translate-y-1"
              onClick={() => navigate(`/details/${p.slug}`)}
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`}
                  alt={`${p.name} – Taskeena Beauty product`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
                {p.quantity <= 0 && (
                  <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Content */}
              <div className="flex flex-col flex-1 justify-between p-4">
                <div>
                  <h3 className="font-semibold text-emerald-800 truncate">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {p.description?.length > 60
                      ? `${p.description.substring(0, 60)}...`
                      : p.description || "No description available."}
                  </p>
                </div>

                <div className="mt-3">
                  <div className="mt-3">
  {p.discountPercent > 0 ? (
    <div>
      <span className="text-gray-400 line-through text-sm">
        PKR {p.price}
      </span>
      <div className="text-rose-500 font-bold">
        PKR {(p.price - (p.price * p.discountPercent) / 100).toFixed(0)} ({p.discountPercent}% OFF)
      </div>
    </div>
  ) : (
    <div className="text-rose-500 font-bold">PKR {p.price}</div>
  )}
</div>

{p.discountPercent > 0 && (
  <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full shadow">
    {p.discountPercent}% OFF
  </span>
)}

                  <div className="text-xs text-gray-500">
                    {p.quantity > 0
                      ? `In stock (${p.quantity})`
                      : "Currently unavailable"}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-rose-500 text-white text-sm py-2 rounded-md font-medium shadow hover:opacity-90 transition-all"
                    onClick={() => navigate(`/details/${p.slug}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
