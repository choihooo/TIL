import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom"; // URL 쿼리 읽기
import PostList from "../../shared/ui/PostList/PostList";
import { getPosts } from "../../utils/postService";
import styles from "./Home.module.scss";



// URL에서 쿼리 스트링 읽는 훅
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [posts, setPosts] = useState([]);
  const query = useQuery().get("query") || ""; // 검색어 가져오기
  
  // 포스트 가져오기 (검색어에 따라 필터링)
  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await getPosts(null, query); // 검색어 전달
      setPosts(postData);
    };
    fetchPosts();
  }, [query]); // 검색어가 바뀔 때마다 다시 불러오기

  return (
    <>
      <Helmet>
        <title>Howu</title>
        <meta
          name="description"
          content="최호의 코딩 블로그입니다! 최신 글을 만나보세요."
        />
        <meta property="og:title" content="Howu" />
        <meta
          property="og:description"
          content="최호의 코딩 블로그입니다! 최신 글을 만나보세요."
        />
        <meta property="og:url" content="https://blog.howu.run" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className={styles.home}>
        {query ? (
          <div className={styles.home__searchResult}>
            <h2>검색 결과: "{query}"</h2>
            <p>{posts.length}개의 포스트가 검색되었습니다.</p>
          </div>
        ) : (
          <h2 className={styles.home__title}>최신 글</h2>
        )}
        <div className={styles.home__postList}>
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

export default Home;
