import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">호의 배움 기록</Link>
      </h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
