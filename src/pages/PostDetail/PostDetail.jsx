import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../utils/postService";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Helmet } from "react-helmet-async";
import Tag from "../../shared/ui/Tag/Tag";
import Toc from "../../shared/ui/Toc/Toc";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import "./PostDetail.scss";
import DOMPurify from "dompurify";

function PostDetail() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const viewerRef = useRef(null);
  const [postDate, setPostDate] = useState("");
  const [postCategory, setPostCategory] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [headings, setHeadings] = useState([]);
  const markdownRef = useRef(null);

  useEffect(() => {
    const fetchPostContent = async () => {
      const { content, title, date, category, tags, thumbnail } = await getPost(
        id
      );
      const processedContent = processMarkdown(content);
      setPostContent(processedContent);
      setPostTitle(title);
      setPostDate(date);
      setPostCategory(category);
      setPostTags(tags);
      const thumbnailUrl =
        thumbnail || `https://blog.howu.run/images/default-thumbnail.jpg`;
      setPostCategory((prev) => ({ ...prev, thumbnailUrl }));
    };
    fetchPostContent();
  }, []);

  useEffect(() => {
    if (viewerRef.current) {
      const timeoutId = setTimeout(() => {
        const viewerElement = viewerRef.current.getRootElement();
        viewerElement.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });
      }, 100); // DOM 렌더링 대기 시간
      return () => clearTimeout(timeoutId);
    }
  }, [postContent]);

  useEffect(() => {
    setTimeout(() => {
      if (viewerRef.current) {
        const headingElements = Array.from(
          viewerRef.current
            .getRootElement()
            .querySelectorAll("h1, h2, h3, h4, h5, h6")
        );
        const tocItems = headingElements.map((heading) => ({
          id: heading.id,
          text: heading.textContent,
          level: parseInt(heading.tagName.replace("H", ""), 10),
        }));
        setHeadings(tocItems);
      }
    }, 100); // DOM 렌더링 대기
  }, [postContent]);

  useEffect(() => {
    const cleanContent = DOMPurify.sanitize(postContent || "");
    if (viewerRef.current) {
      viewerRef.current.getInstance().setMarkdown(cleanContent);
    }
  }, [postContent]);

  const processMarkdown = (markdown) => {
    // 형광펜 처리
    const highlightRegex = /==\((파랑|노랑|빨강)\)(.+?)==/g;
    markdown = markdown.replace(highlightRegex, (match, color, text) => {
      const colorMap = {
        파랑: "blue",
        노랑: "yellow",
        빨강: "red",
      };
      const colorClass = colorMap[color];
      return `<mark class="highlight highlight--${colorClass}">${text}</mark>`;
    });

    // 헤더 처리 및 ID 생성
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    markdown = markdown.replace(headerRegex, (match, hashes, headerText) => {
      const slug = headerText
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      const level = hashes.length;
      return `<h${level} id="${slug}">${headerText}</h${level}>`;
    });

    // XSS 공격 방지를 위해 DOMPurify를 사용하여 안전하게 처리
    return DOMPurify.sanitize(markdown);
  };

  return (
    <div className="post-detail">
      <Helmet>
        <title>{postTitle ? `${postTitle} - Howu` : "Howu 블로그"}</title>
        <meta
          property="og:title"
          content={postTitle ? `${postTitle} - Howu` : "Howu 블로그"}
        />
        <meta
          property="og:description"
          content="Howu 블로그에서 제공하는 풍부한 컨텐츠를 만나보세요."
        />
        <meta
          property="og:image"
          content={`https://blog.howu.run${encodeURIComponent(
            postCategory.thumbnailUrl
          )}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={postTitle ? `${postTitle} - Howu` : "Howu 블로그"}
        />
        <meta
          name="twitter:description"
          content="Howu 블로그에서 제공하는 풍부한 컨텐츠를 만나보세요."
        />
        <meta
          name="twitter:image"
          content={`https://blog.howu.run${encodeURIComponent(
            postCategory.thumbnailUrl
          )}`}
        />
      </Helmet>

      <header className="post-detail__header">
        {postCategory.thumbnailUrl && (
          <div className="post-detail__header-thumbnail">
            <img
              src={postCategory.thumbnailUrl}
              alt={postTitle}
              className="post-detail__header-thumbnail-img"
            />
          </div>
        )}
        <h1 className="post-detail__header-title">{postTitle}</h1>
        <p className="post-detail__header-date">{postDate}</p>
        <div className="post-detail__header-tags">
          {postTags.map((tag, index) => (
            <Tag key={index} label={tag} />
          ))}
        </div>
      </header>

      <main className="post-detail__content">
        <Viewer ref={viewerRef} initialValue={postContent} />
      </main>

      <Toc headings={headings} postTitle={postTitle} />
    </div>
  );
}

export default PostDetail;
