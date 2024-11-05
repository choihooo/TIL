import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Config } from "../types/config";

export default function getConfig(): Config {
  const filePath = path.join(process.cwd(), "config.yaml");

  // 파일 존재 여부 확인
  if (!fs.existsSync(filePath)) {
    throw new Error("config.yaml 파일이 존재하지 않습니다.");
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as Config;

  return data;
}
