// src/pages/PostDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../utils/postService";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function PostDetail() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const fetchPostContent = async () => {
      const markdown = await getPost(id);
      setPostContent(markdown);
    };
    fetchPostContent();
  }, [id]);

  return (
    <div>
      <h1>Post Detail</h1>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {postContent}
      </ReactMarkdown>
    </div>
  );
}

export default PostDetail;
