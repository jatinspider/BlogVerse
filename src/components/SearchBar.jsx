// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function SearchBar() {
//   const [query, setQuery] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query) {
//       // Redirect to search results page with the query
//       navigate(`/search-results-for/${encodeURIComponent(query)}`);
//       setQuery(''); // Clear the input after search
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="flex items-center">
//       <input
//         type="text"
//         placeholder="Search..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="border rounded-l-md p-2"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white rounded-r-md px-4 py-2 mr-2"
//       >
//         Search
//       </button>
//     </form>
//   );
// }

// export default SearchBar;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      // Redirect to search results page with the query
      navigate(`/search-results-for/?query=${encodeURIComponent(query)}`); // Match the defined route
      setQuery(''); // Clear the input after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-l-md p-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-r-md px-4 py-2 mr-2"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
