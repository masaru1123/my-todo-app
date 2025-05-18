// src/hooks/useLocalStorageProjects.ts
import { useEffect, useState } from "react";
import type { Project } from "../types/Project";

export const useLocalStorageProjects = (key: string) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((p: any) => ({
          ...p,
          createdAt: p.createdAt || new Date().toISOString(),
        }));
      }
    } catch (e) {
      console.error("読み込み失敗", e);
    }
    return [
      {
        id: crypto.randomUUID(),
        title: "無題",
        tasks: [],
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(projects));
  }, [key, projects]);

  return [projects, setProjects] as const;
};
