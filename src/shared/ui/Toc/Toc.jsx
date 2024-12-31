import React from "react";
import styles from "./Toc.module.scss";

function Toc({ headings, postTitle }) {
  return (
    <aside className={styles.toc}>
      <h2 className={styles.toc__title}>{postTitle}</h2>
      <ul className={styles.toc__list}>
        {headings.map((heading) => {
          const levelClass = styles[`toc__list-item--level-${heading.level}`];
          return (
            <li
              key={heading.id}
              className={`${styles.toc__listItem} ${levelClass}`}
              style={{ marginLeft: (heading.level - 1) * 10 }}
            >
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Toc;
