import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  base: "/", // 기본 경로. 배포 환경에서 프로젝트의 루트 경로 설정
  server: {
    port: 3000, // 개발 서버의 포트
    open: true, // 개발 서버 실행 시 브라우저 자동 열기
    historyApiFallback: true, // React Router를 사용하는 SPA에서 새로고침 시 경로 문제 해결
  },
  build: {
    outDir: "dist", // 빌드 결과 디렉토리
  },

  css: {
    preprocessorOptions: {
      less: {
        math: "parens-division",
      },
      scss: {
        api: "modern-compiler", // or "modern", "legacy"
      },
    },
  },
});
