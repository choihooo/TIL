import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import RightSidebar from "../../shared/ui/RightSidebar/RightSidebar";
import Home from "../../pages/Home/Home";
import PostDetail from "../../pages/PostDetail/PostDetail";
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

      {!isPostDetailPage && (
        <div className={styles.app__carousel}>
          <Carousel />
        </div>
      )}

      <div className={styles.app__main}>
        <main className={styles["app__main-content"]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>

        {!isPostDetailPage && (
          <RightSidebar className={styles["app__sidebar"]} />
        )}
      </div>

      <Footer className={styles.app__footer} />
    </div>
  );
}

export default Layout;
