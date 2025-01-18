import React from "react";
import "./Banner.scss"; // SCSS 파일 임포트
import TypingText from "../../../components/banner/TypingText/TypingText";

function Banner() {
  const sentences = ["히히히히힛", "호호호홋", "하하하하핫"];

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