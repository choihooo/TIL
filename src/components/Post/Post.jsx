import React from "react";
import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import "./Post.scss";

function Post({ post }) {
  const handleTagClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Link to={`/post/${post.id}`} className="post">
      <div>
        <h2 className="post__title">{post.title}</h2>
        <p className="post__date">{post.date}</p>
        <div className="post__category">
          <strong>Category: </strong>
          <span className="post__category-main">
            {post.category.main + "/" + post.category.sub}
          </span>
        </div>
        <div className="post__tags">
          <strong>Tags: </strong>
          {post.tags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>
        <p className="post__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}

export default Post;
