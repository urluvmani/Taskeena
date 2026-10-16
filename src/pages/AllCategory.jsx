import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const AllCategory = () => {
  const Category = useCategory();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
            <Sparkles className="text-primary-600" size={16} />
            <span className="text-primary-700 font-medium text-sm">Browse Our Collection</span>
            <Sparkles className="text-primary-600" size={16} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Categories
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our wide range of beauty and wellness products
          </p>
        </motion.div>

        {/* Categories Grid */}
        {Category && Category.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {Category.map((c, index) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/category/${c.slug}`}
                  className="card-hover block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="text-white" size={24} />
                      </div>
                      <ArrowRight className="text-gray-400 group-hover:text-primary-600 transition-colors" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Discover premium {c.name.toLowerCase()} products
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Sparkles className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Found</h3>
            <p className="text-gray-500">Check back later for new categories</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
