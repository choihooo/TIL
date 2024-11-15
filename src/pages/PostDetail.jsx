// src/pages/PostDetail.js
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../utils/postService";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/github.css";

function PostDetail() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");
  const [headings, setHeadings] = useState([]);
  const markdownRef = useRef(null);

  useEffect(() => {
    const fetchPostContent = async () => {
      const markdown = await getPost(id);
      setPostContent(markdown);
    };
    fetchPostContent();
  }, [id]);

  useEffect(() => {
    if (markdownRef.current) {
      // 특정 Markdown 콘텐츠 내에서만 헤딩 요소 추출
      const headingElements = Array.from(
        markdownRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")
      );
      const tocItems = headingElements.map((heading) => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.replace("H", ""), 10),
      }));
      setHeadings(tocItems);
    }
  }, [postContent]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Post Content */}
      <main style={{ flex: 1, maxWidth: "800px" }}>
        <h1>Post Detail</h1>
        <div ref={markdownRef}>
          <ReactMarkdown
            rehypePlugins={[
              rehypeHighlight,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
          >
            {postContent}
          </ReactMarkdown>
        </div>
      </main>

      {/* Floating TOC */}
      <aside
        style={{
          position: "fixed",
          top: "20px",
          right: "5%",
          width: "200px",
          maxHeight: "80vh",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Table of Contents</h2>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ marginLeft: (heading.level - 1) * 10 }}
            >
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default PostDetail;
