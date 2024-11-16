import React from "react";
import Post from "../Post/Post";
import "./PostList.scss";

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div className="post-list__item" key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
