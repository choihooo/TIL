import React from "react";
import "./LeftSidebar.scss";

function LeftSidebar() {
  return (
    <aside className="content-layout__sidebar content-layout__sidebar--left">
      <div className="left-sidebar__profile">
        <img
          src="/images/profile.jpeg"
          alt="Profile"
          className="left-sidebar__profile-image"
        />
        <h2 className="left-sidebar__profile-name">최호 | Howu</h2>
        <p className="left-sidebar__profile-description">
          예, 코딩은 잘 모르고요. 그냥 열심히 합니다. 열심히
        </p>
      </div>
      <img
        src="https://github-readme-stats.vercel.app/api?username=choihooo&show_icons=true&theme=transparent"
        alt="GitHub Stats"
      />
      <img
        src="https://github-readme-stats.vercel.app/api/top-langs/?username=choihooo&layout=compact&theme=transparent"
        alt="Top Languages"
      />
      <img
        src="https://github-readme-streak-stats.herokuapp.com/?user=choihooo&theme=transparent"
        alt="GitHub Streak"
      />

      <a href="https://github.com/ryo-ma/github-profile-trophy">
        <img
          src="https://github-profile-trophy.vercel.app/?username=choihooo&theme=transparent&column=2"
          alt="GitHub Trophies"
        />
      </a>
    </aside>
  );
}

export default LeftSidebar;
