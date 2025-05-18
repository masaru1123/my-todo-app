// src/types/Project.ts
import type { Task } from "./Task";

export type Project = {
  id: string;
  title: string;
  tasks: Task[];
  memo: string;
  createdAt: string;
};
