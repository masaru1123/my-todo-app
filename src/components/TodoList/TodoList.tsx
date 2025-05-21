import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import MemoBox from "../MemoBox/MemoBox";
import styles from "./TodoList.module.css";
import type { Task } from "../../types/Task";

interface Props {
  tasks: Task[];
  onAdd: (text: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  title: string;
  onTitleChange: (newTitle: string) => void;
  onCreateProject: () => void;
  memo: string;
  setMemo: (value: string) => void;
}

export default function TodoList({
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onToggle,
  title,
  onTitleChange,
  onCreateProject,
  memo,
  setMemo,
}: Props) {
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    onAdd(taskInput);
    setTaskInput("");
  };

  return (
    <div className={styles.todoList}>
      <div className={styles.titleRow}>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="タイトルを入力"
          className={styles.titleInput}
        />
        <button onClick={onCreateProject} className={styles.newProjectButton}>
          ＋
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.inputWrapper}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="タスクを追加"
          className={styles.input}
        />
        <button type="submit" className={styles.addButton}>
          追加
        </button>
      </form>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>

      <MemoBox memo={memo} onMemoChange={setMemo} />
    </div>
  );
}
