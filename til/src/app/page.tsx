import styles from "./Home.module.scss";
import StampCalendar from "./components/StampCalendar";
import AllTag from "./components/AllTag";
import Content from "./components/Content";
import Search from "./components/Search";

export default function Home() {
  // posts 데이터를 가져오는 함수를 컴포넌트 내부에 정의

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <AllTag />
      </div>
      <div className={styles.column}>
        <StampCalendar />
        <Content />
      </div>
      <div className={styles.column}>
        <Search />
      </div>
    </div>
  );
}
