import styles from "./Sidebar.module.css";
import type { Project } from "../../types/Project";
import { Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  currentId: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Sidebar({
  isOpen,
  projects,
  currentId,
  onSelect,
  onDelete,
}: Props) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.content}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${styles.projectItem} ${
              currentId === project.id ? styles.active : ""
            }`}
            onClick={() => onSelect(project.id)}
          >
            <span className={styles.title}>{project.title.trim() === "" ? "無題" : project.title}</span>
            <button
              className={styles.delete}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
