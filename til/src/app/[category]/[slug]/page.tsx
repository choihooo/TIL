import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

// MDXContent를 동적 import하여 클라이언트 전용으로 사용
const MDXContent = dynamic(() => import("./components/MDXContent"), {
  ssr: false, // 서버사이드 렌더링 비활성화 (클라이언트에서만 렌더링)
});

interface PostMatter {
  title: string;
  date: string;
  category?: string;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const filePath = path.join(process.cwd(), "posts", category, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const grayMatter = data as PostMatter;

    // MDX 콘텐츠를 직렬화
    const mdxSource = await serialize(content);
    const dateString = dayjs(grayMatter.date)
      .locale("ko")
      .format("YYYY년 MM월 DD일");

    return (
      <div style={{ padding: "2rem" }}>
        <h1>{grayMatter.title}</h1>
        <p>{dateString}</p>
        <article>
          {/* MDXContent를 클라이언트 전용 컴포넌트로 사용 */}
          <MDXContent source={mdxSource} />
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
  }
}
