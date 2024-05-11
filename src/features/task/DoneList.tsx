import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getTasks } from '../../services/apiTasks';
import AppMain from '../../ui/AppMain';
import Label from '../../ui/Label';
import NoTasks from '../../ui/NoTasks';
import { Task } from 'Task';
import TaskItem from './TaskItem';

const DoneList = () => {
  const done: any = useLoaderData();
  return (
    <AppMain name="Tasks / Todo">
      <Label />
      {done.length === 0 ? (
        <NoTasks type="Done" />
      ) : (
        <div className="flex flex-col">
          {done.map((task: Task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      )}
    </AppMain>
  );
};

export const loader: LoaderFunction<any> = ({ request }) => {
  const url = new URL(request.url);
  const priority = url.searchParams.get('priority');
  const difficulty = url.searchParams.get('difficulty');

  const done = getTasks('done', priority, difficulty);
  return done;
};

export default DoneList;
