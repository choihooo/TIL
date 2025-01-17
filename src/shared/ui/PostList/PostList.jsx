import React, { useState, useEffect } from "react";
import PostItem from "../PostItem/PostItem";
import PostItemSkeleton from "../PostItemSkeleton/PostItemSkeleton";
import "./PostList.scss";

function PostList({ posts }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (posts.length === 0) {
      // 가정: posts가 비어있으면 로딩 중으로 간주
      setLoading(true);
    } else {
      // 데이터가 로드되면 로딩 상태 해제
      setLoading(false);
    }
  }, [posts]); // posts가 변경될 때마다 효과 실행

  const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="post-list">
      {loading ? (
        // 로딩 중에는 스켈레톤 UI 표시
        Array.from({ length: 5 }).map((_, idx) => <PostItemSkeleton key={idx} />)
      ) : sortedPosts.length > 0 ? (
        // 로딩 완료 후 포스트 목록 표시
        sortedPosts.map((post) => (
          <div className="post-list__item" key={post.id}>
            <PostItem post={post} />
          </div>
        ))
      ) : (
        // 포스트가 없는 경우
        <div className="post-list__empty">게시물이 없습니다.</div>
      )}
    </div>
  );
}

export default PostList;
