import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container,PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getAllPosts();
        if (response && response.documents) {
          setPosts(response.documents);
          console.log("Fetched posts:", response.documents);
        } else {
          console.error("Failed to fetch posts: No documents found.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className='w-full py-8 mt-4 text-center'>Loading posts...</div>; 

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="columns-1 sm:columns-2 md:columns-3  gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="break-inside-avoid mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div>No posts available.</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

