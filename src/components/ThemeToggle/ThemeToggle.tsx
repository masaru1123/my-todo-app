import styles from "./ThemeToggle.module.css";
import { useTheme } from "../../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleWrapper}>
      <span className={styles.label}>Light / Dark</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
