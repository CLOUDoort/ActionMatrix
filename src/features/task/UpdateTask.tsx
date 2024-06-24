import { LoaderFunction, useLoaderData } from 'react-router-dom';

import CreateTaskForm from '../create/form/CreateTaskForm';
import { useCreateSubtask } from '../create/CreateSubtaskContext';
import { useEffect } from 'react';
import Loader from '@/ui/Loader';
import { useGetTask } from './queries';

const UpdateTask = () => {
  const { version, type, id }: any = useLoaderData();
  const { initSubtask } = useCreateSubtask();
  const { isLoading, task } = useGetTask(version, type as string, id as string);

  useEffect(() => {
    if (!task || task.subtask === undefined) return;
    initSubtask(task.subtask);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4">
        <p>Update Task</p>
      </div>
      <CreateTaskForm version={version} update={task} />
    </section>
  );
};

export const loader: LoaderFunction<any> = ({ params }) => {
  const { version, type, id } = params;

  return { version, type, id };
};

export default UpdateTask;
