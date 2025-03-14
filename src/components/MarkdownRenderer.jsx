import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import "prismjs/themes/prism.css";
import "../core/App.scss";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="choiho">
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypePrism]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

// ✅ PropTypes 추가 (content는 필수이며 string 타입이어야 함)
MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default MarkdownRenderer;
