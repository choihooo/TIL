import React from "react";
import Post from "../Post/Post";
import "./PostList.scss";

function PostList({ posts }) {
  const sortedPosts = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신 날짜 기준 정렬
    .slice(0, 3);

  return (
    <div className="post-list">
      {sortedPosts.map((post) => (
        <div className="post-list__item" key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <div className="flex justify-center items-center w-full">
        <img
          src="https://render.gitanimals.org/farms/choihooo"
          width="800"
          alt="gitanimals"
        />
      </div>
    </div>
  );
}

export default PostList;
