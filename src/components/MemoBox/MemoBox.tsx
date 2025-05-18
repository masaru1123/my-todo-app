import styles from "./MemoBox.module.css";

interface Props {
  memo: string;
  onMemoChange: (newMemo: string) => void;
}

export default function MemoBox({ memo, onMemoChange }: Props) {
  return (
    <div className={styles.memoBox}>
      <textarea
        value={memo}
        onChange={(e) => onMemoChange(e.target.value)}
        placeholder="Memo"
        className={styles.textarea}
        rows={4}
      />
    </div>
  );
}
