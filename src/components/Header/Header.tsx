import styles from "./Header.module.css";

interface Props {
  isMenuOpen: boolean;
  onMenuClick: () => void;
}

export default function Header({ isMenuOpen, onMenuClick }: Props) {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={onMenuClick}>
        {isMenuOpen ? "✖" : "☰"}
      </button>
      <h1 className={styles.title}>To-Do List</h1>
    </header>
  );
}
