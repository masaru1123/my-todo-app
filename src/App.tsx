import { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import TodoList from "./components/TodoList/TodoList";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import styles from "./App.module.css";
import type { Task } from "./types/Task";
import type { Project } from "./types/Project";
import { useLocalStorageProjects } from "./hooks/useLocalStorageProjects";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useLocalStorageProjects("todo-projects");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memo, setMemo] = useState(projects[currentIndex]?.memo || "");

  const currentProject = projects[currentIndex];

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAddTask = (text: string) => {
    const updated = [...projects];
    updated[currentIndex].tasks.unshift({
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setProjects(updated);
  };

  const handleEditTask = (id: string, newText: string) => {
    const updated = [...projects];
    const task = updated[currentIndex].tasks.find((t) => t.id === id);
    if (task) task.text = newText;
    setProjects(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = [...projects];
    updated[currentIndex].tasks = updated[currentIndex].tasks.filter((t) => t.id !== id);
    setProjects(updated);
  };

  const handleToggleTask = (id: string) => {
    const updated = [...projects];
    const task = updated[currentIndex].tasks.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
    setProjects(updated);
  };

  const handleCreateProject = () => {
    const updated = [...projects];
    updated[currentIndex].memo = memo;

    // 空欄タイトルは「無題」にする
    const currentTitle = projects[currentIndex].title.trim();
    const correctedTitle = currentTitle === "" ? "無題" : currentTitle;
    updated[currentIndex].title = correctedTitle;

    const newProject: Project = {
      id: crypto.randomUUID(),
      title: "", // ← 新規作成時は空でOK（次回保存時に補正）
      tasks: [],
      memo: "",
      createdAt: new Date().toISOString(),
    };

    setProjects([newProject, ...updated]);
    setCurrentIndex(0);
    setMemo("");
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);

    if (updated.length === 0) {
      const newProject: Project = {
        id: crypto.randomUUID(),
        title: "",
        tasks: [],
        memo: "",
        createdAt: new Date().toISOString(),
      };
      setProjects([newProject]);
      setCurrentIndex(0);
      setMemo("");
    } else {
      setProjects(updated);
      setCurrentIndex(0);
      setMemo(updated[0].memo || "");
    }
  };

  return (
    <div className={styles.app}>
      <Header isMenuOpen={isSidebarOpen} onMenuClick={toggleSidebar} />

      <div className={styles.bodyContainer}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          projects={projects}
          currentId={currentProject.id}
          onSelect={(id) => {
            const index = projects.findIndex((p) => p.id === id);
            if (index !== -1) {
              setCurrentIndex(index);
              setMemo(projects[index].memo || "");
            }
            setIsSidebarOpen(false);
          }}
          onDelete={handleDeleteProject}
        />

        <main className={styles.main}>
          <TodoList
            tasks={currentProject.tasks}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
            title={currentProject.title}
            onTitleChange={(newTitle) => {
              const updated = [...projects];
              updated[currentIndex].title = newTitle;
              setProjects(updated);
            }}
            onCreateProject={handleCreateProject}
            memo={memo}
            setMemo={setMemo}
          />
          <ThemeToggle />
        </main>
      </div>
    </div>
  );
}
