import React from "react";
import styles from "./Profile.module.scss";

function Profile() {
  return (
    <div className={styles["profile"]}>
      <img
        src="/images/profile.jpeg"
        alt="Profile"
        className={styles["profile__image"]}
      />
      <h2 className={styles["profile__name"]}>
        최호
        <div className={styles["profile__bar"]} />
        Howu
      </h2>
      <p className={styles["profile__description"]}>
        예, 코딩은 잘 모르고요. 그냥 열심히 합니다. 열심히
      </p>
    </div>
  );
}

export default Profile;
