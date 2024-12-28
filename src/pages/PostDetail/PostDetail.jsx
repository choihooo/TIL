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

  return (
    <div className="post-detail">
      <Helmet>
        <title>{postTitle ? `${postTitle} - Howu` : "Howu 블로그"}</title>
        <meta
          name="description"
          content={
            postContent
              ? postContent.substring(0, 150)
              : "Howu 블로그 글입니다."
          }
        />
        <meta property="og:title" content={postTitle || "Howu 블로그"} />
        <meta
          property="og:description"
          content={
            postContent
              ? postContent.substring(0, 150)
              : "Howu 블로그 글입니다."
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://blog.howu.run/post/${id}`} />
        <meta
          property="og:image"
          content={
            postCategory.thumbnailUrl ||
            "https://blog.howu.run/images/default-thumbnail.jpg"
          }
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postTitle || "Howu 블로그"} />
        <meta
          name="twitter:description"
          content={
            postContent
              ? postContent.substring(0, 150)
              : "Howu 블로그 글입니다."
          }
        />
        <meta
          name="twitter:image"
          content={
            postCategory.thumbnailUrl ||
            "https://blog.howu.run/images/default-thumbnail.jpg"
          }
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
              p({ children, ...props }) {
                const highlightRegex = /==\((파랑|노랑|빨강)\)(.+?)==/g;
                const parts = children.toString().split(highlightRegex);

                return (
                  <p {...props}>
                    {parts.map((part, index) => {
                      if (index % 3 === 1) {
                        const colorClass =
                          {
                            파랑: "highlight--blue",
                            노랑: "highlight--yellow",
                            빨강: "highlight--red",
                          }[part] || "highlight";

                        return (
                          <mark
                            key={index}
                            className={`highlight ${colorClass}`}
                          >
                            {parts[index + 1]}
                          </mark>
                        );
                      }
                      return part;
                    })}
                  </p>
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
