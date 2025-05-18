// ✅ TodoItem.tsx：1つのタスク表示・編集・削除・完了切替
import { useState } from "react";
import styles from "./TodoItem.module.css";

interface Props {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ id, text, completed, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onEdit(id, inputValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className={styles.checkbox}
      />

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className={styles.editForm}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.editInput}
            autoFocus
          />
          <button type="submit" className={styles.saveBtn}>保存</button>
        </form>
      ) : (
        <span
          className={`${styles.text} ${completed ? styles.completed : ""}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {text}
        </span>
      )}

      <button onClick={() => onDelete(id)} className={styles.deleteBtn}>削除</button>
    </li>
  );
}
