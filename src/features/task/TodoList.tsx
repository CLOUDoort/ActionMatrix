import { LoaderFunction, useLoaderData } from 'react-router-dom';

import AppMain from '../../ui/AppMain';
import TaskLabel from '../../ui/TaskLabel';
import NoTasks from '../../ui/NoTasks';
import type { Task } from 'Task';
import TaskItem from './TaskItem';
import { getTasks } from '../../services/apiTasks';

const TodoList = () => {
  const todo: any = useLoaderData();

  return (
    <AppMain name="Tasks / Todo">
      <TaskLabel />
      {todo.length === 0 ? (
        <NoTasks type="Todo" />
      ) : (
        <div className="flex flex-col w-full h-full mb-10">
          {todo.map((task: Task) => (
            <TaskItem type="todo" task={task} key={task.id} />
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
