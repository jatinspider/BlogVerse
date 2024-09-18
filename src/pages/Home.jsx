import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteService.getAllPosts([]).then((posts) => {
      if (posts) {
        const usersPosts = posts.documents.filter(
          (post) => post.userId === userData?.$id
        );
        setPosts(usersPosts);
      }
    });
  }, [ userData]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
      <div className="columns-1 sm:columns-2 md:columns-3  gap-4">
          {posts.map((post) => (
            <div key={post.$id} className="break-inside-avoid mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
