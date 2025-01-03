import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.scss";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter" && query.trim()) {
      navigate(`/?query=${query}`);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleSearch}
        className={styles.searchInput}
      />
    </div>
  );
}

export default SearchBar;
