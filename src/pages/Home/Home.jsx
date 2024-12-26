import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Helmet 추가
import PostList from "../../shared/ui/PostList/PostList";
import { getPosts } from "../../utils/postService";
import styles from "./Home.module.scss";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await getPosts();
      setPosts(postData);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Howu</title>
        <meta
          name="description"
          content="최호의 코딩 블로그입니다! 최신 글을 만나보세요."
        />
        <meta property="og:title" content="Howu" />
        <meta
          property="og:description"
          content="최호의 코딩 블로그입니다! 최신 글을 만나보세요."
        />
        <meta property="og:url" content="https://blog.howu.run" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className={styles.home}>
        <div className={styles.home__postList}>
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

export default Home;
