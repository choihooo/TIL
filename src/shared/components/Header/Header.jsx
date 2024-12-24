import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <h1 className={styles.header__title}>
          <Link to="/">
            <img src="/images/logo.png" className={styles.header__logo}></img>
          </Link>
        </h1>
        <div className={styles.header__nav}>
          <nav className={styles.header__nav_link}>
            <Link to="/">Home</Link>
          </nav>
          <nav className={styles.header__nav_link}>
            <Link to="/">Post</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
