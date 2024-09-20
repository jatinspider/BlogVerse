import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); 
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userData) {
        setPosts([]);
        return;
      }

      try {
        const postsResponse = await appwriteService.getAllPosts();
        if (postsResponse) {
          const usersPosts = postsResponse.documents.filter(
            (post) => post.userId === userData.$id
          );
          setPosts(usersPosts);
          console.log("Fetched posts:", postsResponse.documents);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message || "Failed to fetch posts.");
      }
    };

    fetchPosts();
  }, [userData]); 

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
          <Link
            to="/login"
            className="text-2xl text-[#C5001A] font-bold hover:text-gray-500 cursor-pointer"
          >Login to read posts
          </Link>
       
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {error && <div className="text-red-500">{error}</div>}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {posts.length === 0 ? (
            <div className="w-full text-center">No posts available.</div>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="break-inside-avoid mb-4 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
