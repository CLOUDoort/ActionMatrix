import type { Task } from 'Task';

export const createTask = (type: string, task: Task) => {
  let temp;
  let oldTask = localStorage.getItem(type);
  if (oldTask === null) temp = [];
  else temp = JSON.parse(oldTask);

  localStorage.setItem('todo', JSON.stringify([...temp, task]));
};
