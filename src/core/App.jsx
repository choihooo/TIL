import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "../shared/components/Header/Header";
import Footer from "../shared/components/Footer/Footer";
import LeftSidebar from "../shared/components/LeftSidebar/LeftSidebar";
import Home from "../pages/Home";
import Post from "../features/Post/pages/Post";
import "./index.scss";
import "./App.scss";
import { HelmetProvider } from "react-helmet-async";

function Layout() {
  const location = useLocation();

  const isPostDetailPage = location.pathname.startsWith("/post");

  return (
    <div>
      <Header className="header" />
      <div className="content-layout">
        {!isPostDetailPage && <LeftSidebar className="left-sidebar" />}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
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
