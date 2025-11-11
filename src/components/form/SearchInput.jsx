import { useSearch } from "../context/searchcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import React from "react";

const SearchInput = () => {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search.keyword.trim()) return;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/search/${
          search.keyword
        }`
      );
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <input
        type="search"
        placeholder="Search products..."
        value={search.keyword}
        onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition duration-200"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchInput;
