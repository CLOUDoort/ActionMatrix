import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';

const AppLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <AppNav />
      <main className="flex justify-center flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
