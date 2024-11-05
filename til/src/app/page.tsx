import styles from "./Home.module.scss";
import StampCalendar from "./components/StampCalendar";
import AllTag from "./components/AllTag";
import Content from "./components/Content";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <AllTag />
      </div>
      <div className={styles.column}>
        <StampCalendar />
        <Content />
      </div>
      <div className={styles.column}>난 검색</div>
    </div>
  );
}
