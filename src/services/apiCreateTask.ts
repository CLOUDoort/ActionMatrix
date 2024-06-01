import type { Task } from 'Task';

export const createTask = (type: string, task: Task) => {
  let storageTask;
  let oldTask = localStorage.getItem(type);
  if (oldTask === null) storageTask = [];
  else storageTask = JSON.parse(oldTask);

  localStorage.setItem('todo', JSON.stringify([...storageTask, task]));
};
