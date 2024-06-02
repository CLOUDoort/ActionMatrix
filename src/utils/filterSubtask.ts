import { Subtask } from 'Task';

export const filterSubtask = (subtask: Subtask) => Object.keys(subtask).filter((el) => subtask[el].length !== 0);
