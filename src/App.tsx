import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TodoList, { loader as taskLoader } from './features/task/TaskList';

import AppLayout from './ui/AppLayout';
import CreateTask from './features/create/CreateTask';
import ErrorBoundary from './ui/ErrorBoundary';
import Home from './ui/Home';
import UpdateTask from './features/task/UpdateTask';
import { loader as updateLoader } from './features/task/UpdateTask';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorBoundary />,
    },
    {
      element: <AppLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/app/task/:type',
          element: <TodoList />,
          loader: taskLoader,
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: ':priority/:difficulty',
              element: <TodoList />,
              loader: taskLoader,
              errorElement: <ErrorBoundary />,
            },
          ],
        },
        {
          path: '/app/update/:type/:id',
          element: <UpdateTask />,
          loader: updateLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          path: '/app/create',
          element: <CreateTask />,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
