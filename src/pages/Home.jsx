import React, { useState, useEffect } from "react";
import PostList from "../components/PostList/PostList";
import { getPosts } from "../utils/postService";
import "./Home.scss";

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
    <div className="home">
      <h1 className="home__title">최신 글</h1>
      <div className="home__post-list">
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default Home;
