import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "../shared/ui/Header/Header";
import Footer from "../shared/ui/Footer/Footer";
import LeftSidebar from "../shared/ui/LeftSidebar/LeftSidebar";
import Home from "../pages/Home/Home";
import PostDetail from "../pages/PostDetail/PostDetail";
import "./index.scss";
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
