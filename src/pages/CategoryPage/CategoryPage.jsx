import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../shared/ui/PostList/PostList";
import { getPosts } from "../../utils/postService";
import styles from "./CategoryPage.module.scss";

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
