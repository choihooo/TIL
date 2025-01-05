import fm from "front-matter";
import DOMPurify from "dompurify";

// 전체 포스트 목록 또는 카테고리별 포스트 목록 불러오기
export async function getPosts(category = null, query = "") {
  try {
    const fileNames = await fetch("/posts.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch posts.json: ${res.status}`);
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error fetching posts.json:", error);
        return [];
      });

    console.log("Fetched file names:", fileNames); // 파일 목록 확인

    const postData = await Promise.all(
      fileNames.map(async (postId) => {
        const response = await fetch(`/posts/${postId}.md`);

        if (!response.ok) {
          console.error(`Failed to fetch ${postId}.md: ${response.status}`);
          return null; // 실패한 경우 null 반환
        }

        const markdown = await response.text();
        const { attributes, body } = fm(markdown);

        console.log(`Fetched post: ${postId}`, attributes);
        const safeTitle = DOMPurify.sanitize(attributes.title || "Untitled");
        console.log(safeTitle);
        return {
          id: postId,
          title: safeTitle,
          date: attributes?.date || new Date().toISOString(),
          excerpt: body.slice(0, 100) + "...",
          category: attributes?.category?.main || "Uncategorized",
          tags: attributes?.tags || [],
          thumbnail: attributes?.thumbnail || "/images/default.png",
          content: body,
        };
      })
    );

    const filteredPosts = postData
      .filter((post) => post !== null) // 실패한 포스트 제외
      .filter((post) => !category || post.category === category);

    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      return filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowerCaseQuery) ||
          post.content.toLowerCase().includes(lowerCaseQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }

    console.log("Filtered Posts:", filteredPosts); // 필터링된 포스트 확인
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

    if (!response.ok) {
      throw new Error(`Failed to fetch ${id}.md: ${response.status}`);
    }

    const markdown = await response.text();
    const { attributes, body } = fm(markdown);

    console.log(`Fetched single post: ${id}`, attributes); // 단일 포스트 메타데이터 확인

    return {
      title: attributes?.title || "Untitled",
      date: attributes?.date || new Date().toISOString(),
      category: attributes?.category?.main || "Uncategorized",
      subCategory: attributes?.category?.sub || "",
      tags: attributes?.tags || [],
      content: body,
      thumbnail: attributes?.thumbnail || "/images/default.png",
    };
  } catch (error) {
    console.error(`Failed to fetch post: ${id}`, error);
    return null;
  }
}
