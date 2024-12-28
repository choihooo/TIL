import React from "react";
import PostItem from "../PostItem/PostItem";
import "./PostList.scss";

function PostList({ posts }) {
  const sortedPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // 최신 날짜 기준 정렬

  return (
    <div className="post-list">
      {sortedPosts.map((post) => (
        <div className="post-list__item" key={post.id}>
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
