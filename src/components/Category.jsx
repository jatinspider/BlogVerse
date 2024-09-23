import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function Category({title, featuredImage }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "";

  return (
    <Link to={`/categories/${title}`}>
      <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
        {/* Image Section */}
        {imageUrl ? (
          <div className="relative group">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600 rounded-t-lg">
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        )}

        {/* Content Section */}
        <div className="p-4">
          {/* Category Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-red-500 transition-colors duration-300">
            {title}
          </h2>

          {/* Read More Link */}
          <p className="text-gray-600 text-sm hover:text-blue-500 transition-colors duration-300">
            Explore {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Category;
