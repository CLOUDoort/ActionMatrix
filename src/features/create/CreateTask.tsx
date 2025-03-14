import { LoaderFunction, useLoaderData } from 'react-router-dom';

import FormLayout from '@/ui/FormLayout';
import CreateTaskForm from './form/CreateTaskForm';

const CreateTask = () => {
  const data: { version: string } = useLoaderData() as { version: string };

  return (
    <FormLayout name="New Task">
      <CreateTaskForm version={data.version} />
    </FormLayout>
  );
};

export const loader: LoaderFunction<any> = ({ params }) => {
  const { version } = params;

  return { version };
};

export default CreateTask;
