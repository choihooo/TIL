import styles from "./Content.module.scss";
import fs from "fs/promises";
import path from "path";
import dayjs from "dayjs";
import matter from "gray-matter";
import readingTime from "reading-time";
import Link from "next/link";

const POSTS_PATH = path.join(process.cwd(), "posts");

const parsePostAbstract = (postPath: string) => {
  const relativePath = postPath
    .slice(postPath.indexOf("posts") + "posts".length + 1)
    .replace(".mdx", "");

  const [category, slug] = relativePath.split("/"); // category와 slug 분리
  const url = `/${category}/${slug}`;

  console.log(`URL: ${url}, Category: ${category}, Slug: ${slug}`);

  return { url, category, slug };
};

const parsePostDetail = async (postPath: string) => {
  const file = await fs.readFile(postPath, "utf8");
  const { data, content } = matter(file);

  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(data.date).locale("ko").format("YYYY년 MM월 DD일");

  return {
    title: data.title,
    date: data.date,
    content,
    readingMinutes,
    dateString,
  };
};

export default async function Content() {
  const categoryFolders = await fs.readdir(POSTS_PATH);

  const postFiles = (
    await Promise.all(
      categoryFolders.map(async (category) => {
        const categoryPath = path.join(POSTS_PATH, category);
        const files = await fs.readdir(categoryPath);
        return files.map((file) => path.join(categoryPath, file));
      })
    )
  ).flat();

  const posts = await Promise.all(
    postFiles.map(async (filePath) => {
      const postAbstract = parsePostAbstract(filePath);
      const postDetail = await parsePostDetail(filePath);
      return { ...postAbstract, ...postDetail };
    })
  );

  return (
    <div className={styles["content"]}>
      <div className={styles["content__section"]}>
        <div className={styles["content__title"]}>최근 글 바로가기</div>
        <ul className={styles["content__list"]}>
          {posts.map((post, index) => (
            <li key={index} className={styles["content__item"]}>
              <Link href={post.url} className={styles["content__item-text"]}>
                {post.title}
              </Link>
              <span className={styles["content__item-date"]}>
                {post.dateString}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
