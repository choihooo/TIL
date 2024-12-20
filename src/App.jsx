import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LeftSidebar from "./components/LeftSidebar/LeftSidebar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import Home from "./pages/Home/Home";
import PostDetail from "./pages/PostDetail/PostDetail";
import "./App.scss";
import { HelmetProvider } from "react-helmet-async";

function Layout() {
  const location = useLocation();

  const isPostDetailPage = location.pathname.startsWith("/post");

  return (
    <div
      className={`app-container ${
        isPostDetailPage ? "app-container--no-sidebar" : ""
      }`}
    >
      <Header className="header" />
      <div className="content-layout">
        {/* PostDetail 페이지에서는 사이드바 숨기기 */}
        {!isPostDetailPage && <LeftSidebar className="left-sidebar" />}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        {!isPostDetailPage && <RightSidebar className="right-sidebar" />}
      </div>
      <Footer className="footer" />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Analytics />
        <Layout />
      </Router>
    </HelmetProvider>
  );
}

export default App;
