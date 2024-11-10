import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
