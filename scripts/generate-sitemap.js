import fs from "fs";
import path from "path";

// 프로젝트 루트와 경로 설정
const PUBLIC_DIR = path.resolve("./public");
const POSTS_DIR = path.resolve("./public/posts");
const SITEMAP_PATH = path.join(PUBLIC_DIR, "sitemap.xml");

// 기본 도메인
const BASE_URL = "https://blog.howu.run";

// 동적으로 URL을 생성하는 함수
const generateSitemap = () => {
  let urls = [
    {
      loc: BASE_URL, // 메인 페이지
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },
  ];

  // 게시물 데이터 읽기
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"));
  posts.forEach((post) => {
    const postSlug = post.replace(".md", "");
    urls.push({
      loc: `${BASE_URL}/post/${postSlug}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
    });
  });

  // XML 구조 생성
  const sitemapXml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>
  `
    )
    .join("")}
</urlset>
  `;

  // sitemap.xml 저장
  fs.writeFileSync(SITEMAP_PATH, sitemapXml.trim());
  console.log("✅ Sitemap 생성 완료:", SITEMAP_PATH);
};

// 실행
generateSitemap();