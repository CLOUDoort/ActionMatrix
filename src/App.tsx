import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import TodoList, { loader as todoLoader } from './features/task/TodoList';
import DoneList, { loader as doneLoader } from './features/task/DoneList';
import { action as createAction } from './features/create/CreateTask';
import CreateTask from './features/create/CreateTask';
import { useCreateSubtask } from './features/create/CreateSubtaskContext';

const App = () => {
  const { clearSubtask } = useCreateSubtask();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      element: <AppLayout />,
      children: [
        {
          path: '/app/todo',
          element: <TodoList />,
          loader: todoLoader,
          children: [
            {
              path: ':priority/:difficulty',
              element: <TodoList />,
              loader: todoLoader,
            },
          ],
        },
        {
          path: '/app/done',
          element: <DoneList />,
          loader: doneLoader,
          children: [
            {
              path: ':priority/:difficulty',
              element: <DoneList />,
              loader: doneLoader,
            },
          ],
        },
        {
          path: '/app/create',
          element: <CreateTask />,
          action: createAction({ clearSubtask }),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
