import type { Focus, SubtaskItem, Task } from 'Task';

import supabase from './supabase';
import { formattedDate } from '@/utils/formattedDate';
import { PostgrestError } from '@supabase/supabase-js';

const handleError = (error: PostgrestError | null, message: string): void => {
  if (error) throw new Error(`${message}: ${error.message}`);
};

export const getUserTask = async (type: string, taskId: string): Promise<Task> => {
  const { data: task, error } = await supabase.from(type).select('*').eq('id', taskId).single();
  handleError(error, 'Error getting task:');

  return task;
};

export const getUserTasks = async (type: string, priority: string | null, difficulty: string | null) => {
  const userId = localStorage.getItem('userId')!;
  let query = supabase.from(type).select('*').eq('user_id', userId);

  if (priority) query = query.eq('priority', priority);

  if (difficulty) query = query.or(`difficulty.eq.${difficulty},subtask.cs.${JSON.stringify([{ difficulty }])}`);

  // 쿼리 실행 및 에러 처리
  const { data: tasks, error } = await query;
  handleError(error, 'Error getting tasks');

  return tasks;
};

export const createUserTask = async (type: string, task: Task) => {
  task.updatedAt = formattedDate(new Date());
  const { error } = await supabase.from(type).insert([task]);

  handleError(error, 'Error creating task');
};

export const updateUserTask = async (origin: string, task: Task) => {
  task.updatedAt = formattedDate(new Date());

  const targetTable = task.progress === 100 ? 'done' : 'todo';
  const oppositeTable = task.progress === 100 ? 'todo' : 'done';

  // 기존의 task가 origin 테이블과 동일할 경우 해당 테이블에서 task를 업데이트
  if (origin === targetTable) {
    const { error } = await supabase.from(targetTable).update(task).eq('id', task.id);
    handleError(error, 'Error updating task');
  } else {
    // 기존의 task가 origin 테이블과 다를 경우 origin 테이블에서 task 삭제하고 target 테이블에 추가
    await deleteUserTask(oppositeTable, task.id);
    await createUserTask(targetTable, task);
  }

  return targetTable;
};

export const deleteUserTask = async (type: string, taskId: string) => {
  const { error } = await supabase.from(type).delete().eq('id', taskId);
  handleError(error, 'Error deleting task');
};

export const finishUserTask = async (focus: Focus) => {
  const task = await getUserTask('todo', focus.id);

  await deleteUserTask('todo', task.id);
  await createUserTask('done', { ...task, progress: 100 });
};

export const finishUserSubtask = async (focus: Focus) => {
  // subtask를 완료하고 subtask의 task에 반영
  const task = await getUserTask('todo', focus.taskId);
  if (!task.subtask || !task.subtaskNum || !task.completedSubtaskNum) {
    throw new Error('Error: no subtask!');
  }
  const subtasks = task.subtask[focus.difficulty];

  const subtaskIndex = subtasks.findIndex((el: SubtaskItem) => el.id === focus.id);
  if (subtaskIndex !== -1) subtasks[subtaskIndex].complete = true;

  task.completedSubtaskNum++;

  let flag = false;
  // 모든 subtask 완료
  if (task.subtaskNum === task.completedSubtaskNum) {
    task.progress = 100;
    await createUserTask('done', task);
    await deleteUserTask('todo', task.id);
    flag = true;
  } else {
    task.progress = Math.trunc((task.completedSubtaskNum / task.subtaskNum) * 100);
    await updateUserTask('todo', task);
  }

  return flag;
};
