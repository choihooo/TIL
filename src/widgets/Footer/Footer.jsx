import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a
          href="https://github.com/choihooo"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__links__link"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
        </a>
        <a
          href="https://velog.io/@hochoi8621/posts"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__links__link"
        >
          <img
            src="https://velog.velcdn.com/images/hyeongjun/post/5fff0129-f29b-4dfa-b28b-f3af0e11ed4f/image.png"
            alt="Velog Logo"
          />
        </a>
      </div>
      <p className="footer__text">&copy; 2024 Howu Blog</p>
    </footer>
  );
}

export default Footer;
