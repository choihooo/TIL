import React from "react";
import { Link } from "react-router-dom";
import "./PostItem.scss";

function PostItem({ post }) {
  const handleTagClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Link to={`/post/${post.id}`} className="post">
        <h2 className="post__title">{post.title}</h2>
        <div className="post__thumbnail-wrapper">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="post__thumbnail"
          />
        </div>{" "}
        <div className="post__content">
          <div className="post__info">
            <p className="post__date">{post.date}</p>
            <p className="post__excerpt">{post.excerpt}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostItem;