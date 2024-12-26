import React from "react";
import styles from "./RightSidebar.module.scss";
import Profile from "../../../components/RightSidebar/Profile/Profile";

function RightSidebar() {
  return (
    <aside className={styles["right-sidebar"]}>
      <Profile />
    </aside>
  );
}

export default RightSidebar;
