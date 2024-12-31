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

  return (
    <div className="post-detail">
      <Helmet>
        <title>{postTitle ? `${postTitle} - Howu` : "Howu 블로그"}</title>
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
              rehypeHighlightText,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
            ]}
            components={{
              p({ children }) {
                return <p dangerouslySetInnerHTML={{ __html: children }} />;
              },
            }}
          >
            {postContent}
          </ReactMarkdown>
        </div>
      </main>

      <Toc headings={headings} postTitle={postTitle} />
    </div>
  );
}

export default PostDetail;
