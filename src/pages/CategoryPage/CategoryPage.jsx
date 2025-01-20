import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../shared/ui/PostList/PostList";
import { getPosts } from "../../utils/postService";
import styles from "./CategoryPage.module.scss";
import { Helmet } from "react-helmet-async";

function CategoryPage() {
  const { main } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts(main);
      setPosts(data);
    };
    fetchPosts();
  }, [main]);

  return (
    <div className={styles["category-page"]}>
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
        <meta
          property="og:image"
          content="https://blog.howu.run/images/banner.jpg"
        />
        <meta property="og:image:width" content="1200" /> // 적절한 이미지 크기
        지정
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <h2 className={styles["category-page__title"]}>
        {main.toUpperCase()} 게시판
      </h2>
      <div className={styles["category-page__posts"]}>
        <PostList posts={posts} />
      </div>
    </div>
  );
}

export default CategoryPage;
