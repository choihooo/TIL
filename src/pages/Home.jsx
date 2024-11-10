import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { getPosts } from "../utils/postService";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await getPosts();
      console.log(postData); // 불러온 데이터 확인
      setPosts(postData);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
