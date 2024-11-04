"use client";

import React, { useState } from "react";
import styles from "./AllTag.module.scss";

type Tag = {
  id: number;
  label: string;
};

export default function AllTag() {
  const [selectedTag, setSelectedTag] = useState<number | null>(null);

  const tags: Tag[] = [
    { id: 1, label: "자격" },
    { id: 2, label: "자격증" },
    { id: 3, label: "태그" },
    { id: 4, label: "리액트를 공부하자" },
    { id: 5, label: "넥스트가 더 중요할지도??" },
    { id: 6, label: "뭐가 중요해 그냥 둘 다 하면 되는거야" },
  ];

  const handleSelect = (id: number) => {
    setSelectedTag((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.tag__container}>
      <div className={styles.tag__header}>Trending Tags</div>
      <div className={styles.tag__list}>
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            className={`${styles.tag__item} ${
              selectedTag === tag.id ? styles["tag__item--active"] : ""
            }`}
            onClick={() => handleSelect(tag.id)}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
