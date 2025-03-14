import { LoaderFunction, useLoaderData } from 'react-router-dom';

import AppMain from '../../ui/AppMain';
import Loader from '@/ui/Loader';
import NoTasks from '../../ui/NoTasks';
import type { Task } from 'Task';
import TaskItem from './TaskItem';
import TaskLabel from '../../ui/TaskLabel';
import { ucFirst } from '@/utils/ucFirst';
import { useGetTasks } from './queries';
import { useEffect, useState } from 'react';

const TaskList = () => {
  const { version, type, priority, difficulty }: any = useLoaderData();
  const { isLoading, task } = useGetTasks(version, type);
  const [taskList, setTaskList] = useState<any>([]);

  useEffect(() => {
    if (!task) return;
    let tasks = task;

    if (priority) tasks = task.filter((el: Task) => el.priority === priority);

    if (difficulty) {
      const difficultyTasks = tasks.filter((el: Task) => el.difficulty === difficulty);
      const subtaskTasks = tasks.filter((el: Task) => el.subtask && el.subtask[difficulty].length !== 0);

      tasks = [...difficultyTasks, ...subtaskTasks];
    }

    setTaskList(tasks);
  }, [task, priority, difficulty]);

  if (isLoading) return <Loader />;

  return (
    <AppMain name={`Tasks / ${ucFirst(type)}`}>
      <TaskLabel />
      {taskList?.length === 0 ? (
        <NoTasks type={ucFirst(type)} />
      ) : (
        <div className="flex flex-col w-full h-full mb-10">
          {taskList?.map((task: Task) => <TaskItem version={version} type={type} task={task} key={task.id} />)}
        </div>
      )}
    </AppMain>
  );
};

export const loader: LoaderFunction<any> = async ({ params, request }) => {
  const url = new URL(request.url);
  const { version, type } = params;

  if (!/demo|app/.test(String(version)) || !/todo|done/.test(String(type))) throw new Error('404 Not Found');

  const priority = url.searchParams.get('priority');
  const difficulty = url.searchParams.get('difficulty');

  return { version, type, priority, difficulty };
};

export default TaskList;
