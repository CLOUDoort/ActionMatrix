import { Subtask, SubtaskItem } from 'Task';

export const calcSubtaskNum = (subtask: Subtask) =>
  Object.keys(subtask).reduce((acc, cur) => acc + subtask[cur].length, 0);

export const calcCompletedNum = (subtask: Subtask) =>
  Number(
    Object.keys(subtask)
      .filter((el) => subtask[el].length !== 0)
      .reduce((acc, cur) => subtask[cur].filter((el: SubtaskItem) => el.complete).length + acc, 0),
  );
