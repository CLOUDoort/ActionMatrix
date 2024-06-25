import { LoaderFunction, useLoaderData } from 'react-router-dom';
import CreateTaskForm from './form/CreateTaskForm';
import FormLayout from '@/ui/FormLayout';

const CreateTask = () => {
  const version = useLoaderData() as string;

  return (
    <FormLayout name="New Task">
      <CreateTaskForm version={version} />
    </FormLayout>
  );
};

export const loader: LoaderFunction<any> = ({ params }) => {
  const { version } = params;

  return { version };
};

export default CreateTask;
