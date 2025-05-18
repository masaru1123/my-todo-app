import type { Task } from "../types/Task";

export const filterTasksByDate = (tasks: Task[]) => {
  const today: Task[] = [];
  const yesterday: Task[] = [];
  const last7Days: Task[] = [];

  const now = new Date();

  tasks.forEach((task) => {
    const created = new Date(task.createdAt);
    const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24); // 日数差

    if (diff < 1) {
      today.push(task);
    } else if (diff < 2) {
      yesterday.push(task);
    } else if (diff < 8) {
      last7Days.push(task);
    }
  });

  return { today, yesterday, last7Days };
};
