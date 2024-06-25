import { LoaderFunction, useLoaderData } from 'react-router-dom';

import CreateTaskForm from '../create/form/CreateTaskForm';
import Loader from '@/ui/Loader';
import { useGetTask } from './queries';
import FormLayout from '@/ui/FormLayout';

const UpdateTask = () => {
  const { version, type, id }: any = useLoaderData();
  const { isLoading, task } = useGetTask(version, type, id);

  if (isLoading) return <Loader />;

  return (
    <FormLayout name="Update Task">
      <CreateTaskForm version={version} update={task} />
    </FormLayout>
  );
};

export const loader: LoaderFunction<any> = ({ params }) => {
  const { version, type, id } = params;

  return { version, type, id };
};

export default UpdateTask;
