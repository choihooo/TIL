import fm from "front-matter";

export async function getPosts() {
  // posts.json 파일에서 파일 목록 가져오기
  const fileNames = await fetch("/posts.json").then((res) => res.json());

  const postData = await Promise.all(
    fileNames.map(async (postId) => {
      const markdown = await fetch(`/posts/${postId}.md`).then((res) =>
        res.text()
      );
      const { attributes, body } = fm(markdown);
      return {
        id: postId,
        title: attributes.title,
        date: attributes.date,
        excerpt: body.slice(0, 100) + "...",
        category: attributes.category,
        tags: attributes.tags || [],
        thumbnail: attributes.thumbnail || "/images/default.png",
      };
    })
  );

  // 날짜 기준 내림차순 정렬
  return postData.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPost(id) {
  const response = await fetch(`/posts/${id}.md`);
  const markdown = await response.text();
  const { attributes, body } = fm(markdown);
  return {
    title: attributes.title,
    date: attributes.date,
    category: attributes.category,
    tags: attributes.tags || [],
    content: body,
    thumbnail: attributes.thumbnail || "/images/default.png",
  };
}
