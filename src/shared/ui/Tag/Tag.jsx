import React from "react";
import "./Tag.scss";

function Tag({ label }) {
  return <span className="tag">{label}</span>;
}

export default Tag;
