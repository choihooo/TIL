import React from "react";
import styles from "./RightSidebar.module.scss";
import Profile from "../../../components/RightSidebar/Profile/Profile";
import { SearchBar } from "../../../features/Search";

function RightSidebar() {
  return (
    <aside className={styles["right-sidebar"]}>
      <Profile />
      <SearchBar />
    </aside>
  );
}

export default RightSidebar;
