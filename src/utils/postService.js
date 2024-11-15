// src/utils/postService.js
import fm from "front-matter";

export async function getPosts() {
  const posts = ["post1", "post2"];
  const postData = await Promise.all(
    posts.map(async (postId) => {
      const markdown = await fetch(`/posts/${postId}.md`).then((res) =>
        res.text()
      );
      const { attributes, body } = fm(markdown);
      return {
        id: postId,
        title: attributes.title,
        date: attributes.date,
        excerpt: body.slice(0, 100) + "...", // 내용 일부를 발췌
      };
    })
  );
  return postData;
}

export async function getPost(id) {
  const response = await fetch(`/posts/${id}.md`);
  const markdown = await response.text();
  const { attributes, body } = fm(markdown);
  return {
    title: attributes.title,
    date: attributes.date,
    content: body, // 전체 내용을 content로 반환
  };
}
