import StampCalendar from "./components/StampCalendar";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.column}>난 태그</div>
      <div className={styles.column}>
        <StampCalendar />
      </div>
      <div className={styles.column}>난 검색</div>
    </div>
  );
}
