import type { Task } from 'Task';

export const createTask = (type: string, task: Task) => {
  let oldTask = localStorage.getItem(type);
  if (oldTask === null) localStorage.setItem(type, '[]');
  let temp;
  if (oldTask !== null) temp = JSON.parse(oldTask);

  localStorage.setItem('todo', JSON.stringify([...temp, task]));
};
