import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

function Post({ post }) {
  return (
    <div className="post">
      <h2 className="post__title">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="post__date">{post.date}</p>
      <p className="post__excerpt">{post.excerpt}</p>
    </div>
  );
}

export default Post;
