import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Helmet 추가
import PostList from "../shared/components/PostList/PostList";
import { getPosts } from "../features/Post/services/postService";
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
      <Helmet>
        <title>Howu</title>
        <meta
          name="description"
          content="최호의 코딩 블로그입니다! 호우의 코딩 블로그 입니다!"
        />
        <meta property="og:title" content="Howu" />
        <meta
          property="og:description"
          content="최호의 코딩 블로그입니다! 호우의 코딩 블로그 입니다!"
        />
        <meta property="og:url" content="https://blog.howu.run" />

        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <h1 className="home__title">최신 글</h1>
      <div className="home__post-list">
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default Home;
