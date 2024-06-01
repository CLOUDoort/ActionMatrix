import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getTask } from '@/services/apiTasks';
import { useEffect } from 'react';
import CreateTaskForm from '../create/form/CreateTaskForm';
import { useCreateSubtask } from '../create/CreateSubtaskContext';

const UpdateTask = () => {
  const task: any = useLoaderData();
  const { initSubtask } = useCreateSubtask();

  useEffect(() => initSubtask(task.subtask), []);

  return (
    <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4">
        <p>Update Task</p>
      </div>
      <CreateTaskForm update={task} />
    </section>
  );
};

export const loader: LoaderFunction<any> = ({ params }: any) => {
  const task = getTask(params.type, params.id);
  return task;
};

export default UpdateTask;
