import fm from "front-matter";

// 전체 포스트 목록 또는 카테고리별 포스트 목록 불러오기
export async function getPosts(category = null, query = "") {
  try {
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
          category: attributes.category.main,
          tags: attributes.tags || [],
          thumbnail: attributes.thumbnail || "/images/default.png",
          content: body,
        };
      })
    );

    let filteredPosts = category
      ? postData.filter((post) => post.category === category)
      : postData;

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.content.toLowerCase().includes(lowerCaseQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }

    return filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

// 특정 게시글 불러오기
export async function getPost(id) {
  try {
    const response = await fetch(`/posts/${id}.md`);
    const markdown = await response.text();
    const { attributes, body } = fm(markdown);

    return {
      title: attributes.title,
      date: attributes.date,
      category: attributes.category.main,
      subCategory: attributes.category.sub,
      tags: attributes.tags || [],
      content: body,
      thumbnail: attributes.thumbnail || "/images/default.png",
    };
  } catch (error) {
    console.error(`Failed to fetch post: ${id}`, error);
    return null;
  }
}
