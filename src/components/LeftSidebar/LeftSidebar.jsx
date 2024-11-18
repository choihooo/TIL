import React from "react";
import "./LeftSidebar.scss";

function LeftSidebar() {
  return (
    <aside className="content-layout__sidebar content-layout__sidebar--left">
      <div className="left-sidebar__profile">
        <img
          src="https://avatars.githubusercontent.com/u/67588757?s=96&v=4" // 프로필 사진
          alt="Profile"
          className="left-sidebar__profile-image"
        />
        <h2 className="left-sidebar__profile-name">최호 | Choi Ho</h2>
        <p className="left-sidebar__profile-description">
          예, 코딩은 잘 모르고요. 그냥 열심히 합니다. 열심히
        </p>
      </div>
    </aside>
  );
}

export default LeftSidebar;
