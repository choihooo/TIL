import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import PostDetail from "./pages/PostDetail/PostDetail";
import "./App.scss";

function App() {
  useEffect(() => {
    document.title = import.meta.env.VITE_APP_TITLE;

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = import.meta.env.VITE_APP_FAVICON;
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header className="header" />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </main>
        <Footer className="footer" />
      </div>
    </Router>
  );
}

export default App;
