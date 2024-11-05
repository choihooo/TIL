import styles from "./Search.module.scss";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function Search() {
  const posts: Post[] = [
    {
      id: 1,
      title: "데이터베이스 정규화",
      content:
        "데이터베이스 정규화는 데이터베이스의 구조를 개선하여 중복 데이터를 최소화하고 데이터 무결성을 유지하기 위한 과정입니다.데이터베이스 정규화는 데이터베이스의 구조를 개선하여 중복 데이터를 최소화하고 데이터 무결성을 유지하기 위한 과정입니다.데이터베이스 정규화는 데이터베이스의 구조를 개선하여 중복 데이터를 최소화하고 데이터 무결성을 유지하기 위한 과정입니다.",
    },
    {
      id: 2,
      title: "야호",
      content:
        "야호! 새로운 기능을 구현했습니다. 사용자 경험을 개선하는 여러 가지 기능들이 포함되었습니다.",
    },
    {
      id: 3,
      title: "JavaScript의 새로운 기능",
      content:
        "JavaScript ES6 이후 많은 새로운 기능들이 추가되어 더욱 편리하고 강력하게 개발할 수 있습니다.",
    },
    {
      id: 4,
      title: "React로 컴포넌트 만들기",
      content:
        "React를 사용하여 컴포넌트를 만들고 재사용 가능한 UI를 구축하는 방법에 대해 알아보겠습니다.React를 사용하여 컴포넌트를 만들고 재사용 가능한 UI를 구축하는 방법에 대해 알아보겠습니다.React를 사용하여 컴포넌트를 만들고 재사용 가능한 UI를 구축하는 방법에 대해 알아보겠습니다.React를 사용하여 컴포넌트를 만들고 재사용 가능한 UI를 구축하는 방법에 대해 알아보겠습니다.",
    },
  ];

  return (
    <div className={styles["search__container"]}>
      <div className={styles["search__input-wrapper"]}>
        <input className={styles["search__input"]} placeholder="Search..." />
        <button className={styles["search__button"]}>🔍</button>
      </div>

      <div className={styles["result__list"]}>
        {posts.map((post) => (
          <div key={post.id} className={styles["result__item"]}>
            <div className={styles["result__item-title"]}>{post.title}</div>
            <div className={styles["result__item-content"]}>{post.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
