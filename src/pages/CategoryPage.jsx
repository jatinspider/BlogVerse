import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { PostCard, Container } from '../components';

function CategoryPage() {
  const { categoryTitle } = useParams(); // Extract categoryTitle from URL parameters
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log('Searching for category:', categoryTitle);
        
        const response = await appwriteService.Category(categoryTitle); // Adjust this to your actual method to fetch posts by category
        setResults(response.documents || []); // Ensure documents is defined
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryTitle) {
      fetchResults();
    } else {
      setLoading(false); // No category provided
    }
  }, [categoryTitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8 w-full">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
  <span className="text-blue-600">Posts in Category:</span> 
  <span className="text-gray-800"> "{categoryTitle}"</span>
</h2>


      <Container>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {results.length > 0 ? (
            results.map((post) => (
              <div key={post.$id} className="break-inside-avoid mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p>No posts found in this category.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default CategoryPage;
