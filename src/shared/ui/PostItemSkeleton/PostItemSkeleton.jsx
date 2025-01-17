// PostItemSkeleton.jsx
import React from "react";
import "./PostItemSkeleton.scss";

function PostItemSkeleton() {
  return (
    <div className="post-skeleton">
      <div className="post-skeleton__content">
        <div className="post-skeleton__title"></div>
        <div className="post-skeleton__excerpt"></div>
        <div className="post-skeleton__date"></div>
      </div>
      <div className="post-skeleton__thumbnail"></div>
    </div>
  );
}

export default PostItemSkeleton;
