import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">호의 배움 기록</Link>
      </h1>
      <div className="header__nav">
        <nav className="header__nav-link">
          <Link to="/">Home</Link>
        </nav>
        <nav className="header__nav-link">
          <Link to="/">Post</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
