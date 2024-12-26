import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../widgets/Layout/Layout";
import { HelmetProvider } from "react-helmet-async";
import "./index.scss";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Analytics />
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
