// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import appwriteService from "../appwrite/config";

// function SearchResults() {
//   const query = new URLSearchParams(useLocation().search).get('query');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await appwriteService.SearchPosts(query); // Call your imported SearchPosts function
       
//         setResults(response.documents);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (query) {
//       fetchResults();
      
//     } else {
//       setLoading(false); // No query provided
//     }
//   }, [query]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='w-full py-8 mt-4 text-center'>
//       <h2 className="text-xl font-bold">Search Results for: "{query}"</h2>
//       {results.length > 0 ? (
//         results.map((post) => (
//           <div key={post.$id} className="mb-4">
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p>{post.content}</p>
//             <p className="text-sm text-gray-500">By {post.userName}</p>
//           </div>
//         ))
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// }

// export default SearchResults;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { PostCard ,Container} from '../components';

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Log the query to confirm it's being passed correctly
        console.log('Searching for:', query);
        
        const response = await appwriteService.SearchPosts(query); // Call your imported SearchPosts function

        // Check if response contains documents
        console.log('Search response:', response);
        setResults(response.documents || []); // Ensure documents is defined
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setLoading(false); // No query provided
    }
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    
<div className="py-8 w-full">
<h2 className="text-xl font-bold">Search Results for: "{query}"</h2>
<Container>
  <div className="columns-1 sm:columns-2 md:columns-3  gap-4">
  <div>
      {results.length > 0 ? (
        results.map((post) => (
          <div key={post.$id} className="break-inside-avoid mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
                <PostCard {...post} />
              </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  </div>
</Container>
</div>
     
  );
}

export default SearchResults;
