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
        } else {
          console.error("Failed to fetch posts: No documents found.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // 
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>; 

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="w-1/4 p-2">
                <PostCard $id={post.$id} title={post.title} featuredImage={post.featuredImage} />
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