import { CreateSubtaskContextProvider } from './CreateSubtaskContext';
import CreateTaskForm from './form/CreateTaskForm';

const CreateTask = () => {
  return (
    <CreateSubtaskContextProvider>
      <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
        <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4">
          <p>New Task</p>
        </div>
        <CreateTaskForm />
      </section>
    </CreateSubtaskContextProvider>
  );
};

export default CreateTask;
