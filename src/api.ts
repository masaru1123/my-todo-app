export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('http://localhost:3001/api/todos');
  if (!res.ok) throw new Error('データの取得に失敗しました');
  return res.json();
};

export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch('http://localhost:3001/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('追加に失敗しました');
  return res.json();
};