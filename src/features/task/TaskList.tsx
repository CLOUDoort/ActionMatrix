import { LoaderFunction, useLoaderData } from 'react-router-dom';

import AppMain from '../../ui/AppMain';
import NoTasks from '../../ui/NoTasks';
import type { Task } from 'Task';
import TaskItem from './TaskItem';
import TaskLabel from '../../ui/TaskLabel';
import { useGetTasks } from './queries';
import Loader from '@/ui/Loader';
import { ucFirst } from '@/utils/ucFirst';

const TaskList = () => {
  const { type, version, priority, difficulty }: any = useLoaderData();
  const { isLoading, task } = useGetTasks(version, type, priority, difficulty);

  if (isLoading) return <Loader />;

  return (
    <AppMain name={`Tasks / ${ucFirst(type)}`}>
      <TaskLabel />
      {task?.length === 0 ? (
        <NoTasks type={ucFirst(type)} />
      ) : (
        <div className="flex flex-col w-full h-full mb-10">
          {task?.map((task: Task) => <TaskItem version={version} type={type} task={task} key={task.id} />)}
        </div>
      )}
    </AppMain>
  );
};

export const loader: LoaderFunction<any> = async ({ params }) => {
  const { type, priority, difficulty } = params;
  const version = localStorage.getItem('version');

  return { type, version, priority, difficulty };
};

export default TaskList;
