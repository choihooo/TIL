import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Post.scss";

function Post({ post }) {
  const handleTagClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* React Helmet으로 동적 메타 태그 설정 */}
      <Helmet>
        <title>{post.title} - My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.thumbnail} />
        <meta
          property="og:url"
          content={`https://yourblog.com/post/${post.id}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Link to={`/post/${post.id}`} className="post">
        <div className="post__content">
          <div className="post__info">
            <h2 className="post__title">{post.title}</h2>
            <p className="post__date">{post.date}</p>
            <p className="post__excerpt">{post.excerpt}</p>
          </div>
        </div>
        <div className="post__thumbnail-wrapper">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="post__thumbnail"
          />
        </div>
      </Link>
    </>
  );
}

export default Post;
