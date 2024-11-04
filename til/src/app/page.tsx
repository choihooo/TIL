import styles from "./Home.module.scss";
import StampCalendar from "./components/StampCalendar";
import AllTag from "./components/AllTag";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <AllTag></AllTag>
      </div>
      <div className={styles.column}>
        <StampCalendar />
      </div>
      <div className={styles.column}>난 검색</div>
    </div>
  );
}
