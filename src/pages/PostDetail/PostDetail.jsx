import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../utils/postService";
import { Helmet } from "react-helmet-async";
import Tag from "../../shared/ui/Tag/Tag";
import Toc from "../../shared/ui/Toc/Toc";
import "./PostDetail.scss";
import MarkdownRenderer from "../../components/MarkdownRenderer";

function PostDetail() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postCategory, setPostCategory] = useState({});
  const [postTags, setPostTags] = useState([]);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const fetchPostContent = async () => {
      const { content, title, date, category, tags, thumbnail } = await getPost(
        id
      );
      setPostContent(content);
      setPostTitle(title);
      setPostDate(date);
      setPostCategory({
        ...category,
        thumbnailUrl: thumbnail || "/default-thumbnail.jpg",
      });
      setPostTags(tags);
      extractHeadings(content);
    };
    fetchPostContent();
  }, [id]);

  const extractHeadings = (markdown) => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    let match;
    const tocItems = [];
    const idMap = new Map(); // 🔥 중복된 ID를 방지하기 위한 Map 추가

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2];
      let id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      // 🔥 같은 id가 있다면 숫자 추가해서 고유하게 만듦
      if (idMap.has(id)) {
        const count = idMap.get(id) + 1;
        idMap.set(id, count);
        id = `${id}-${count}`;
      } else {
        idMap.set(id, 1);
      }

      tocItems.push({ id, text, level });
    }

    setHeadings(tocItems);
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
        <MarkdownRenderer content={postContent} />
      </main>

      <Toc headings={headings} postTitle={postTitle} />
    </div>
  );
}

export default PostDetail;
