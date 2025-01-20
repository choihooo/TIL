import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../utils/postService";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { Helmet } from "react-helmet-async";
import Tag from "../../shared/ui/Tag/Tag";
import Toc from "../../shared/ui/Toc/Toc";
import "highlight.js/styles/github.css";
import { visit } from "unist-util-visit";
import "./PostDetail.scss";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";

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
      const { content, title, date, category, tags, thumbnail } = await getPost(
        id
      );
      setPostContent(content);
      setPostTitle(title);
      setPostDate(date);
      setPostCategory(category);
      setPostTags(tags);
      const thumbnailUrl =
        thumbnail || `https://blog.howu.run/images/default-thumbnail.jpg`;
      setPostCategory((prev) => ({ ...prev, thumbnailUrl }));
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

  // rehype 플러그인: 텍스트 변환 (파랑, 노랑, 빨강 형광펜)
  const rehypeHighlightText = () => {
    return (tree) => {
      visit(tree, "text", (node) => {
        const highlightRegex = /==\((파랑|노랑|빨강)\)(.+?)==/g;
        node.value = node.value.replace(highlightRegex, (_, color, text) => {
          const colorMap = {
            파랑: "blue",
            노랑: "yellow",
            빨강: "red",
          };
          const colorClass = colorMap[color] || "yellow"; // 기본값은 노랑
          return `<mark class="highlight highlight--${colorClass}">${text}</mark>`;
        });
      });
    };
  };

  const cleanContent = DOMPurify.sanitize(postContent || "");

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
        <meta property="og:image" content={postCategory.thumbnailUrl} />
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
        <meta name="twitter:image" content={postCategory.thumbnailUrl} />
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
        <div
          ref={markdownRef}
          className="post-detail__content-markdown markdown-container"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeHighlight,
              rehypeSlug,
              rehypeHighlightText, // 형광펜 로직 반영
              rehypeRaw,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              li({ children }) {
                const content = Array.isArray(children)
                  ? children.join("")
                  : children;

                const hasHtml = /<[^>]+>/.test(content);

                return hasHtml ? (
                  <li dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <li>{children}</li>
                );
              },
              p({ children }) {
                const content = Array.isArray(children)
                  ? children.join("")
                  : children;

                // 형광펜이나 HTML 마크업이 포함된 경우
                const hasHtml = /<[^>]+>/.test(content);

                return hasHtml ? (
                  <p dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p>{children}</p>
                );
              },
              img: ({ node, ...props }) => {
                const src = props.src.startsWith("http")
                  ? props.src
                  : `${window.location.origin}${props.src}`;

                return (
                  <img
                    {...props}
                    src={src}
                    alt={props.alt || "이미지"}
                    loading="lazy"
                    className="post-detail__image"
                  />
                );
              },
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </div>
      </main>

      <Toc headings={headings} postTitle={postTitle} />
    </div>
  );
}

export default PostDetail;
