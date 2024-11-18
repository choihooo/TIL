import fs from "fs/promises";
import path from "path";

const postsDirectory = path.join(process.cwd(), "public/posts");
const outputFile = path.join(process.cwd(), "public/posts.json");

(async () => {
  try {
    const files = await fs.readdir(postsDirectory);
    const fileNames = files
      .filter((file) => file.endsWith(".md")) // .md 파일만 선택
      .map((file) => file.replace(".md", "")); // 확장자 제거

    // JSON 파일 생성
    await fs.writeFile(outputFile, JSON.stringify(fileNames, null, 2), "utf-8");
    console.log("posts.json 생성 완료!");
  } catch (err) {
    console.error("posts.json 생성 중 오류 발생:", err);
  }
})();
