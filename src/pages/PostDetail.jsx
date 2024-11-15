import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../utils/postService";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "highlight.js/styles/github.css";
import "./PostDetail.scss";

function PostDetail() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [headings, setHeadings] = useState([]);
  const markdownRef = useRef(null);

  useEffect(() => {
    const fetchPostContent = async () => {
      const { content, title, date } = await getPost(id);
      setPostContent(content);
      setPostTitle(title);
      setPostDate(date);
    };
    fetchPostContent();
  }, [id]);

  useEffect(() => {
    if (markdownRef.current) {
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
    <div className="post-detail">
      {/* Post Header with Title and Date */}
      <header className="post-detail__header">
        <h1 className="post-detail__header-title">{postTitle}</h1>
        <p className="post-detail__header-date">{postDate}</p>
      </header>

      {/* Post Content */}
      <main className="post-detail__content">
        <div ref={markdownRef} className="post-detail__content-markdown">
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
      <aside className="post-detail__toc">
        <h2 className="post-detail__toc-title">Table of Contents</h2>
        <ul className="post-detail__toc-list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className="post-detail__toc-list-item"
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
