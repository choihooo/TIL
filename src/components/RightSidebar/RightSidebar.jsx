import React from "react";
import "./RightSidebar.scss";

function RightSidebar() {
  return (
    <aside className="content-layout__sidebar content-layout__sidebar--right">
      <div className="right-sidebar__section">
        <h2 className="right-sidebar__section-title">Search</h2>
        <input
          type="text"
          placeholder="Search..."
          className="right-sidebar__section-content"
        />
      </div>
      <div className="right-sidebar__section">
        <h2 className="right-sidebar__section-title">Categories</h2>
        <ul className="right-sidebar__section-content">
          <li>Technology</li>
          <li>Lifestyle</li>
          <li>Travel</li>
          <li>Food</li>
        </ul>
      </div>
      <div className="right-sidebar__section">
        <h2 className="right-sidebar__section-title">Recent Posts</h2>
        <ul className="right-sidebar__section-content">
          <li>Post 1</li>
          <li>Post 2</li>
          <li>Post 3</li>
        </ul>
      </div>
    </aside>
  );
}

export default RightSidebar;
