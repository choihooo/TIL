const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // MDX 설정 옵션을 넣을 수 있습니다.
  },
});

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"], // MDX 확장자를 추가
});
