import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const NAV_ITEMS = [
  { path: "/", label: "ALL" },
  { path: "/category/dev", label: "Dev" },
  { path: "/category/plan", label: "Plan" },
  { path: "/category/uiux", label: "UI/UX" },
  { path: "/category/story", label: "Story" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <h1 className={styles.header__title}>
          <Link to="/">
            <img
              src="/images/logo.webp"
              alt="Howu Logo"
              className={styles.header__logo}
            />
            Howu
          </Link>
        </h1>

        <button className={styles.header__menu_btn} onClick={toggleMenu}>
          ☰
        </button>

        <nav
          className={`${styles.header__nav} ${
            isMenuOpen ? styles.header__nav_open : ""
          }`}
        >
          <ul className={styles.header__nav_list}>
            {NAV_ITEMS.map(({ path, label }) => (
              <li key={label} className={styles.header__nav_item}>
                <Link
                  to={path}
                  className={styles.header__nav_link}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
