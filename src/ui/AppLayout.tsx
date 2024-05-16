import AppNav from './Navigation/AppNav';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <AppNav />
      <main className="flex justify-center flex-1 h-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
