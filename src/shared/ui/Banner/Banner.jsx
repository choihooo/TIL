import React from "react";
import "./Banner.scss"; // SCSS 파일 임포트
import TypingText from "../../../components/Banner/TypingText/TypingText"

function Banner() {
  const sentences = ["호호호호", "배움을 좋아", "사용자 경험을 개선", "효율적인 개발환경을 고민"];

  return (
    <div className="banner">
      <div className="banner__overlay"></div>
      <div className="banner__text">
        나는
        <div className="banner__text-type">
          <TypingText
            strings={sentences}
            typingSpeed={200}
            deletingSpeed={300}
          />
        </div>
        하는 개발자입니다.
      </div>
    </div>
  );
}

export default Banner;
