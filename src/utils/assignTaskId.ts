import { Subtask, SubtaskItem } from 'Task';

export const assignTaskId = (subtask: Subtask, taskId: string) => {
  Object.keys(subtask)
    .filter((el) => subtask[el].length !== 0)
    .forEach((key) => {
      subtask[key] = subtask[key].map((item: SubtaskItem) => {
        return { ...item, taskId };
      });
    });

  return subtask;
};
