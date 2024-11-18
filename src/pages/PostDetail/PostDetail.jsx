import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../utils/postService";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import Tag from "../../components/Tag/Tag";
import "highlight.js/styles/github.css";
import "./PostDetail.scss";

function PostDetail() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postCategory, setPostCategory] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [headings, setHeadings] = useState([]);
  const markdownRef = useRef(null);

  useEffect(() => {
    const fetchPostContent = async () => {
      const { content, title, date, category, tags } = await getPost(id);
      setPostContent(content);
      setPostTitle(title);
      setPostDate(date);
      setPostCategory(category);
      setPostTags(tags);
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
      <header className="post-detail__header">
        <h1 className="post-detail__header-title">{postTitle}</h1>
        <p className="post-detail__header-date">{postDate}</p>
        <div className="post-detail__header-category">
          <span className="post-detail__header-category-main">
            {postCategory.main + "/" + postCategory.sub}
          </span>
        </div>
        <div className="post-detail__header-tags">
          {postTags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>
      </header>

      <main className="post-detail__content">
        <div
          ref={markdownRef}
          className="post-detail__content-markdown markdown-container"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeHighlight,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              li({ children, ...props }) {
                const checkboxRegex = /^\[([ xX])\] (.+)$/; // 체크박스 패턴 정규식
                const match = children[0]?.props?.children
                  ?.toString()
                  .match(checkboxRegex);

                // 체크박스가 포함된 경우
                if (match) {
                  const isChecked = match[1].toLowerCase() === "x"; // 체크 여부 판단
                  const text = match[2]; // 체크박스 이후 텍스트 추출
                  return (
                    <li {...props}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="markdown-checkbox" // 체크박스 스타일 클래스
                      />
                      <span>{text}</span>
                    </li>
                  );
                }

                // 일반 리스트 항목
                return <li {...props}>{children}</li>;
              },
              blockquote({ children }) {
                return <blockquote>{children}</blockquote>;
              },
              ul({ children }) {
                return <ul className="custom-ul">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="custom-ol">{children}</ol>;
              },
              li({ children, ...props }) {
                return (
                  <li className="custom-li" {...props}>
                    {children}
                  </li>
                );
              },
            }}
          >
            {postContent}
          </ReactMarkdown>
        </div>
      </main>

      <aside className="post-detail__toc">
        <h2 className="post-detail__toc-title">{postTitle}</h2>
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
