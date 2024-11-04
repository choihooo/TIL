import styles from "./Navbar.module.scss";

interface NavBarProps {
  author: string;
}

export default function NavBar({ author }: NavBarProps) {
  return (
    <div className={styles.navbar}>
      <div>{author}&apos;s TIL</div>
    </div>
  );
}
