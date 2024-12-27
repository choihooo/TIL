import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostList from "../../shared/ui/PostList/PostList";
import { getPosts } from "../../utils/postService";

function CategoryPage() {
  const { main } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts(main);
      setPosts(data);
      console.log(main);
    };
    fetchPosts();
  }, [main]);

  return (
    <div>
      <h2>{main.toUpperCase()} 게시판</h2>
      <PostList posts={posts} />
    </div>
  );
}

export default CategoryPage;
