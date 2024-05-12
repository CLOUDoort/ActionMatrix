import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getTasks } from '../../services/apiTasks';
import AppMain from '../../ui/AppMain';
import Label from '../../ui/Label';
import NoTasks from '../../ui/NoTasks';
import type { Task } from 'Task';
import TaskItem from './TaskItem';

const TodoList = () => {
  const todo: any = useLoaderData();

  return (
    <AppMain name="Tasks / Todo">
      <Label />
      {todo.length === 0 ? (
        <NoTasks type="Todo" />
      ) : (
        <div className="flex flex-col w-full ">
          {todo.map((task: Task) => (
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

  const todo = getTasks('todo', priority, difficulty);
  return todo;
};

export default TodoList;
