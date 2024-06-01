import DoneList, { loader as doneLoader } from './features/task/DoneList';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TodoList, { loader as todoLoader } from './features/task/TodoList';
import { action as editAction, loader as editLoader } from './features/edit/EditTask';

import AppLayout from './ui/AppLayout';
import CreateTask from './features/create/CreateTask';
import EditTask from './features/edit/EditTask';
import Home from './ui/Home';

const App = () => {
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
        },
        {
          path: '/app/edit/:type/:id',
          element: <EditTask />,
          loader: editLoader,
          action: editAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
