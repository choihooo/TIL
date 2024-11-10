import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import dayjs from "dayjs";
import { notFound } from "next/navigation";
import MDXContent from "./components/MDXcontent";

interface PostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

interface PostMatter {
  title: string;
  date: string;
  category?: string;
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = params;

  const filePath = path.join(process.cwd(), "posts", category, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const grayMatter = data as PostMatter;

    const mdxSource = await serialize(content);
    const dateString = dayjs(grayMatter.date)
      .locale("ko")
      .format("YYYY년 MM월 DD일");

    return (
      <div style={{ padding: "2rem" }}>
        <h1>{grayMatter.title}</h1>
        <p>{dateString}</p>
        <article>
          <MDXContent source={mdxSource} />
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    notFound();
  }
}
