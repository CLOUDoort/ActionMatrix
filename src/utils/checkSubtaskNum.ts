import { Subtask } from 'Task';

export const checkSubtaskNum = (subtask: Subtask) =>
  Object.keys(subtask).reduce((acc, cur) => acc + subtask[cur].length, 0);
