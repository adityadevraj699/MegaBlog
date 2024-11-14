import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);

  return (
    <div className="w-full min-h-screen py-8 bg-gray-100">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {posts.length === 0 ? (
            <div className="w-full text-center text-xl text-gray-600 p-4">
              No posts available
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
