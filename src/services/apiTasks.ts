import type { Focus, SubtaskItem, Task } from 'Task';

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
    let subtaskArr = data.filter(
      (el: Task) =>
        el.subtask &&
        el.subtask[difficulty].length !== 0 &&
        el.subtask[difficulty].some((el: SubtaskItem) => !el.complete),
    );
    data = [...difficultyArr, ...subtaskArr];
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

export const finishTask = (focus: Focus) => {
  let todo = getTasks('todo', null, null);
  let done = getTasks('done', null, null);

  const task = todo.find((el: Task) => el.id === focus.id);
  todo = todo.filter((el: Task) => el.id !== task.id);
  done = [...done, { ...task, progress: 100 }];

  localStorage.setItem('todo', JSON.stringify(todo));
  localStorage.setItem('done', JSON.stringify(done));
};

export const finishSubtask = (focus: Focus) => {
  let todo = getTasks('todo', null, null);
  let done = getTasks('done', null, null);

  // subtask 수정하고 subtask의 task에 반영
  const targetTask = todo.find((el: Task) => el.id === focus.taskId);
  console.log(focus);
  const subtask = targetTask.subtask[focus.difficulty].find((el: SubtaskItem) => el.id === focus.id);
  subtask.complete = true;

  targetTask.subtask[subtask.difficulty] = targetTask.subtask[subtask.difficulty].filter(
    (el: SubtaskItem) => el.id !== subtask.id,
  );

  targetTask.subtask = {
    ...targetTask.subtask,
    [subtask.difficulty]: [...targetTask.subtask[subtask.difficulty], subtask],
  };
  targetTask.completedSubtaskNum += 1;

  todo = todo.filter((el: Task) => el.id !== targetTask.id);

  let flag = false;
  // 모든 subtask 완료
  if (targetTask.subtaskNum === targetTask.completedSubtaskNum) {
    done = [...done, { ...targetTask, progress: 100 }];
    flag = true;
  } else {
    const rate = Math.trunc((targetTask.completedSubtaskNum / targetTask.subtaskNum) * 100);
    todo = [...todo, { ...targetTask, progress: rate }];
  }

  localStorage.setItem('todo', JSON.stringify(todo));
  localStorage.setItem('done', JSON.stringify(done));
  return flag;
};
