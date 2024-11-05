import styles from "./Content.module.scss";

export default function Content() {
  return (
    <div className={styles["content"]}>
      <div className={styles["content__section"]}>
        <div className={styles["content__title"]}>최근 글 바로가기</div>
        <ul className={styles["content__list"]}>
          <li className={styles["content__item"]}>
            <span className={styles["content__item-text"]}>
              데이터베이스 정규화
            </span>
            <span className={styles["content__item-date"]}>31 Mar 2018</span>
          </li>
          <li className={styles["content__item"]}>
            <span className={styles["content__item-text"]}>
              HTTPS와 SSL 인증서, SSL 동작방법
            </span>
            <span className={styles["content__item-date"]}>11 Mar 2018</span>
          </li>
          <li className={styles["content__item"]}>
            <span className={styles["content__item-text"]}>
              Django 배포연습 4 - uwsgi 를 통한 Django 실행
            </span>
            <span className={styles["content__item-date"]}>04 Mar 2018</span>
          </li>
        </ul>
      </div>

      <div className={styles["content__section"]}>
        <div className={styles["content__title"]}>알고리즘 문제풀이</div>
        <ul className={styles["content__list"]}>
          <li className={styles["content__item"]}>
            <span className={styles["content__item-text"]}>
              hackerrank - Nested Lists
            </span>
            <span className={styles["content__item-date"]}>04 Nov 2017</span>
          </li>
          <li className={styles["content__item"]}>
            <span className={styles["content__item-text"]}>
              hackerrank - Finding the percentage
            </span>
            <span className={styles["content__item-date"]}>04 Nov 2017</span>
          </li>
          <li className={styles["content__item"]}>
            <span className={styles["content__item-text"]}>
              leetcode 657. Judge Route Circle
            </span>
            <span className={styles["content__item-date"]}>21 Oct 2017</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
