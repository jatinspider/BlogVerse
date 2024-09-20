// import React from "react";
// import appwriteService from "../appwrite/config";
// import { Link } from "react-router-dom";

// function PostCard({ $id, title, featuredImage }) {
//   const imageUrl = featuredImage
//     ? appwriteService.getFilePreview(featuredImage)
//     : "";

//   return (
//     <Link to={`/post/${$id}`}>
//       <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full object-cover"
            
//           />
//         ) : (
//           <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
//             <span className="text-sm font-medium">No Image Available</span>
//           </div>
//         )}
//         <div className="p-4">
//           <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-red-500 transition-colors duration-300">
//             {title}
//           </h2>
//           <p className="text-gray-600 text-sm">Read more...</p>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default PostCard;
import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";


function PostCard({ $id, title, featuredImage, userName, createdAt }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "";

  return (
    <Link to={`/posts/${$id}`}>
      <div className="bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-red-500 transition-colors duration-300">
            {title}
          </h2>

          
          <div className="text-sm text-gray-500 mb-2">
            <span>By {userName || "Unknown"}</span> |{" "}
            <span>{createdAt ||"Unknown date"}</span>
          </div>

          <p className="text-gray-600 text-sm">Read more...</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
