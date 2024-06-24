import CreateTaskForm from './form/CreateTaskForm';
import { useAuthContext } from '@/authentication/AuthContext';

const CreateTask = () => {
  const {
    auth: { version },
  } = useAuthContext();

  return (
    <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4">
        <p>New Task</p>
      </div>
      <CreateTaskForm version={version} />
    </section>
  );
};

export default CreateTask;
