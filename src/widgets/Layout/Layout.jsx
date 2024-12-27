import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RightSidebar from "../../shared/ui/RightSidebar/RightSidebar";
import Home from "../../pages/Home/Home";
import PostDetail from "../../pages/PostDetail/PostDetail";
import CategoryPage from "../../pages/CategoryPage/CategoryPage";
import Carousel from "../../shared/ui/Carousel/Carousel";
import styles from "./Layout.module.scss";

function Layout() {
  const location = useLocation();
  const isPostDetailPage = location.pathname.startsWith("/post");

  return (
    <div
      className={`${styles.app} ${
        isPostDetailPage ? styles["app--no-sidebar"] : ""
      }`}
    >
      <Header className={styles.app__header} />

      {/* 캐러셀은 홈, 카테고리 페이지에서만 보이게 설정 */}
      {!isPostDetailPage && (
        <div className={styles.app__carousel}>
          <Carousel />
        </div>
      )}

      <div className={styles.app__main}>
        <main className={styles["app__main-content"]}>
          <Routes>
            {/* 홈 페이지 */}
            <Route path="/" element={<Home />} />

            {/* 게시글 상세 */}
            <Route path="/post/:id" element={<PostDetail />} />

            {/* 카테고리 페이지 (동적 라우팅) */}
            <Route path="/category/:main" element={<CategoryPage />} />
          </Routes>
        </main>

        {/* 우측 사이드바는 상세 페이지에서 숨김 */}
        {!isPostDetailPage && (
          <RightSidebar className={styles["app__sidebar"]} />
        )}
      </div>

      <Footer className={styles.app__footer} />
    </div>
  );
}

export default Layout;
