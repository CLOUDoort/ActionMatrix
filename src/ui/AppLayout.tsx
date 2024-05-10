import AppNav from './Navigation/AppNav';
import { Outlet } from 'react-router-dom';
import { CreateSubtaskContextProvider } from '../features/create/CreateSubtaskContext';

const AppLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <AppNav />
      <main className="flex justify-center flex-1 h-full">
        <CreateSubtaskContextProvider>
          <Outlet />
        </CreateSubtaskContextProvider>
      </main>
    </div>
  );
};

export default AppLayout;
