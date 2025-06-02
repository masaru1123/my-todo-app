import type { Project } from "../types/Project";

export function useApiProjects() {
  const saveProjects = (data: Project[]) => {
    fetch("http://localhost:3001/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => console.log("✅ サーバーに保存しました"))
      .catch((err) => console.error("❌ サーバー保存失敗:", err));
  };

  return [null, saveProjects] as const;
}