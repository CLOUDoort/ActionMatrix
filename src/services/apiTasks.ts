import type { Task } from 'Task';

export const getTasks = (type: string, priority: string | null, difficulty: string | null) => {
  let task = localStorage.getItem(type);
  if (task === null) return [];

  let data = JSON.parse(task);
  if (!priority && !difficulty) return data;

  // priority 조건이 있을 경우 정렬
  if (priority) data = data.filter((el: Task) => el.priority === priority);

  // difficulty 조건이 있을 경우 정렬
  if (difficulty) {
    // task에 difficulty가 있을 경우
    let difficultyArr = data.filter((el: Task) => {
      if (el.difficulty) return el.difficulty === difficulty;
    });

    // task에 subtask가 있을 경우 subtask의 해당 difficulty에 맞는 task 분리
    let subtaskArr = data.filter((el: Task) => el.subtask && el.subtask[difficulty].length !== 0);
    subtaskArr = subtaskArr.map((el: Task) => {
      if (el.subtask && el.subtask[difficulty].length !== 0) return el.subtask[difficulty];
    });
    data = [...difficultyArr, ...subtaskArr.flat()];
  }

  return data;
};

export const deleteTask = (type: string, targetId: string) => {
  let task = localStorage.getItem(type);
  if (task === null) return;

  let data = JSON.parse(task);
  data = data.filter((el: Task) => el.id !== targetId);

  localStorage.setItem(type, JSON.stringify(data));
};
