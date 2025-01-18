import React, { useState, useEffect } from "react";

const TypingText = ({ strings, typingSpeed = 150, deletingSpeed = 100 }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(typingSpeed);

  useEffect(() => {
    const currentString = strings[index % strings.length]; // 현재 문자열
    const textLength = text.length; // 현재 텍스트 길이

    const handleTyping = () => {
      if (isDeleting) {
        // 삭제 모드
        if (textLength > 0) {
          // 텍스트를 하나씩 삭제
          setText(currentString.substring(0, textLength - 1));
          setDelay(deletingSpeed);
        } else {
          // 모든 텍스트 삭제 후 다음 문자열로
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % strings.length);
          setDelay(typingSpeed);
        }
      } else {
        // 타이핑 모드
        if (textLength < currentString.length) {
          // 텍스트를 하나씩 추가
          setText(currentString.substring(0, textLength + 1));
          setDelay(typingSpeed);
        } else {
          // 문자열이 완성되면 삭제 모드로 전환
          setIsDeleting(true);
          setDelay(2000); // 완성 후 일시정지 시간
        }
      }
    };

    const timeout = setTimeout(handleTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, strings, typingSpeed, deletingSpeed, delay]);

  return (
    <div className="typing-animation">
      <span>{text}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default TypingText;
