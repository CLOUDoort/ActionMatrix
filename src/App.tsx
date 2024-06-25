import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import TaskList, { loader as taskLoader } from './features/task/TaskList';
import CreateTask, { loader as createLoader } from './features/create/CreateTask';
import UpdateTask, { loader as updateLoader } from './features/task/UpdateTask';
import AppLayout, { loader as layoutLoader } from './ui/AppLayout';
import ErrorBoundary from './ui/ErrorBoundary';
import Home from './ui/Home';

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
      loader: layoutLoader,
      children: [
        {
          path: '/:version/task/:type',
          element: <TaskList />,
          loader: taskLoader,
          errorElement: <ErrorBoundary />,
          children: [
            {
              path: ':priority/:difficulty',
              element: <TaskList />,
              loader: taskLoader,
              errorElement: <ErrorBoundary />,
            },
          ],
        },
        {
          path: '/:version/update/:type/:id',
          element: <UpdateTask />,
          loader: updateLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          path: '/:version/create',
          element: <CreateTask />,
          loader: createLoader,
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
