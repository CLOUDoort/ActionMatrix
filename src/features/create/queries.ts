import type { Task } from 'Task';
import { createDemoTask } from '@/services/apiDemoTasks';
import { createUserTask } from '@/services/apiUserTasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/constants/queryKeys';
import { updateDemoTask } from '@/services/apiDemoTasks';
import { updateUserTask } from '@/services/apiUserTasks';

export const useCreateTask = (version: string, type: string) => {
  const queryClient = useQueryClient();

  const queryFn = async (task: Task) => {
    if (version === 'demo') {
      return Promise.resolve(createDemoTask(type, task)); // 동기 함수 래핑
    } else {
      return await createUserTask(type, task); // 비동기 함수
    }
  };

  const { mutate } = useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TODO] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DONE] });
    },
  });

  return { mutate };
};

export const useUpdateTask = (version: string, origin: 'done' | 'todo') => {
  const queryClient = useQueryClient();

  const queryFn = async (task: Task) => {
    if (version === 'demo') {
      return Promise.resolve(updateDemoTask(origin, task)); // 동기 함수 래핑
    } else {
      return await updateUserTask(origin, task); // 비동기 함수
    }
  };

  const { mutate } = useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TODO] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DONE] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.TASK] });
    },
  });

  return { mutate };
};
