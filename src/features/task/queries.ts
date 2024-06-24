import type { Focus } from 'Task';

import queryKeys from '@/constants/queryKeys';
import { deleteDemoTask } from '@/services/apiDemoTasks';
import { deleteUserTask } from '@/services/apiUserTasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDemoTask } from '@/services/apiDemoTasks';
import { getUserTask } from '@/services/apiUserTasks';
import { useQuery } from '@tanstack/react-query';
import { getDemoTasks } from '@/services/apiDemoTasks';
import { getUserTasks } from '@/services/apiUserTasks';
import { finishDemoTask } from '@/services/apiDemoTasks';
import { finishUserTask } from '@/services/apiUserTasks';
import { finishDemoSubtask } from '@/services/apiDemoTasks';
import { finishUserSubtask } from '@/services/apiUserTasks';

export const useGetTask = (version: string, type: string, taskId: string) => {
  const queryFn = async () => {
    if (version === 'demo') {
      return Promise.resolve(getDemoTask(type, taskId)); // 동기 함수 래핑
    } else {
      return await getUserTask(type, taskId); // 비동기 함수
    }
  };
  const { isLoading, data: task } = useQuery({ queryKey: [queryKeys.TASK], queryFn });

  return { isLoading, task };
};

export const useGetTasks = (version: string, type: string) => {
  const key = type === 'todo' ? 'TODO' : 'DONE';

  const queryFn = async () => {
    if (version === 'demo') {
      return Promise.resolve(getDemoTasks(type)); // 동기 함수 래핑
    } else {
      return await getUserTasks(type); // 비동기 함수
    }
  };

  const { isLoading, data: task } = useQuery({ queryKey: [queryKeys[key]], queryFn });

  return { isLoading, task };
};

export const useDeleteTask = (version: string, type: string, taskId: string) => {
  const queryClient = useQueryClient();
  const key = type === 'todo' ? 'TODO' : 'DONE';
  const queryFn = async () => {
    if (version === 'demo') {
      return Promise.resolve(deleteDemoTask(type, taskId)); // 동기 함수 래핑
    } else {
      return await deleteUserTask(type, taskId); // 비동기 함수
    }
  };
  const { mutate } = useMutation({
    mutationFn: queryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys[key]] });
    },
  });

  return { mutate };
};

export const useFinishTask = (version: string) => {
  const queryClient = useQueryClient();
  const queryFn = async (focus: Focus) => {
    if (version === 'demo') {
      return Promise.resolve(finishDemoTask(focus)); // 동기 함수 래핑
    } else {
      return await finishUserTask(focus); // 비동기 함수
    }
  };
  const { mutate } = useMutation({
    mutationFn: (focus: Focus) => queryFn(focus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TASK] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.TODO] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DONE] });
    },
  });

  return { mutate };
};

export const useFinishSubtask = (version: string) => {
  const queryClient = useQueryClient();

  const queryFn = async (focus: Focus) => {
    if (version === 'demo') {
      return Promise.resolve(finishDemoSubtask(focus));
    } else {
      return await finishUserSubtask(focus); // 비동기 함수
    }
  };
  const { mutate } = useMutation({
    mutationFn: (focus: Focus) => queryFn(focus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.TASK] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.TODO] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.DONE] });
    },
  });

  return { mutate };
};
