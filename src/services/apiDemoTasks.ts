import { formattedDate } from '@/utils/formattedDate';
import type { Focus, SubtaskItem, Task } from 'Task';

const getTasksFromStorage = (type: string): Task[] => {
  const tasks = localStorage.getItem(type);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (type: string, tasks: Task[]): void => {
  localStorage.setItem(type, JSON.stringify(tasks));
};

export const getDemoTask = (type: string, taskId: string): Task => {
  const taskList = getTasksFromStorage(type);
  const task = taskList.find((el: Task) => el.id === taskId);
  if (!task) throw new Error('Error getting task!');

  return task;
};

export const getDemoTasks = (type: string, priority: string | null, difficulty: string | null): Task[] => {
  let tasks = getTasksFromStorage(type);

  if (!priority && !difficulty) return tasks;

  if (priority) tasks = tasks.filter((el: Task) => el.priority === priority);

  if (difficulty) {
    const difficultyTasks = tasks.filter((el: Task) => el.difficulty === difficulty);
    const subtaskTasks = tasks.filter((el: Task) => el.subtask && el.subtask[difficulty].length !== 0);

    tasks = [...difficultyTasks, ...subtaskTasks];
  }

  return tasks;
};

export const createDemoTask = (type: string, task: Task): void => {
  const tasks = getTasksFromStorage(type);
  task.updatedAt = formattedDate(new Date());

  saveTasksToStorage(type, [...tasks, task]);
};

export const updateDemoTask = (origin: string, task: Task) => {
  let todo = getTasksFromStorage('todo');
  let done = getTasksFromStorage('done');
  task.updatedAt = formattedDate(new Date());

  const updateTaskList = (tasks: Task[], task: Task) => tasks.map((el: Task) => (el.id === task.id ? task : el));

  const moveTaskBetweenLists = (from: Task[], to: Task[], task: Task) => {
    from = from.filter((el: Task) => el.id !== task.id);
    to = [...to, task];
    return [from, to];
  };

  // done으로 이동
  if (task.progress === 100) {
    if (origin === 'done') done = updateTaskList(done, task);
    else [todo, done] = moveTaskBetweenLists(todo, done, task);
  } else {
    if (origin === 'todo') todo = updateTaskList(todo, task);
    else [done, todo] = moveTaskBetweenLists(done, todo, task);
  }

  saveTasksToStorage('todo', todo);
  saveTasksToStorage('done', done);
};

export const deleteDemoTask = (type: string, taskId: string): void => {
  const tasks = getTasksFromStorage(type);
  const updatedTasks = tasks.filter((el: Task) => el.id !== taskId);

  saveTasksToStorage(type, updatedTasks);
};

export const finishDemoTask = (focus: Focus) => {
  const todo = getTasksFromStorage('todo').filter((el: Task) => el.id !== focus.id);
  const task = getDemoTask('todo', focus.id);
  const done = [...getTasksFromStorage('done'), { ...task, progress: 100 }];

  saveTasksToStorage('todo', todo);
  saveTasksToStorage('done', done);
};

export const finishDemoSubtask = (focus: Focus) => {
  let todo = getTasksFromStorage('todo');
  let done = getTasksFromStorage('done');

  // subtask 수정하고 subtask의 task에 반영
  const task = getDemoTask('todo', focus.taskId);
  if (!task.subtask || task.subtaskNum === undefined || task.completedSubtaskNum === undefined) {
    throw new Error('Error no subtask!');
  }
  const subtasks = task.subtask[focus.difficulty];
  const subtaskIndex = subtasks.findIndex((el: SubtaskItem) => el.id === focus.id);
  if (subtaskIndex !== -1) subtasks[subtaskIndex].complete = true;

  task.completedSubtaskNum++;

  // 모든 subtask 완료
  if (task.subtaskNum === task.completedSubtaskNum) {
    done = [...done, { ...task, progress: 100 }];
    todo = todo.filter((el: Task) => el.id !== task.id);
    saveTasksToStorage('done', done);
  } else {
    task.progress = Math.trunc((task.completedSubtaskNum / task.subtaskNum) * 100);
    todo = todo.map((el: Task) => (el.id === task.id ? task : el));
  }
  saveTasksToStorage('todo', todo);
};
