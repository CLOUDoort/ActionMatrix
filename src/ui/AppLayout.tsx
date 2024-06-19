import { Outlet, useNavigation } from 'react-router-dom';

import AppNav from './Navigation/AppNav';
import Loader from './Loader';
import { CreateSubtaskContextProvider } from '@/features/create/CreateSubtaskContext';
import { useAuth } from '@/authentication/useAuth';

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  useAuth();

  return (
    <CreateSubtaskContextProvider>
      <div className="flex w-full h-screen">
        {isLoading && <Loader />}
        <AppNav />
        <main className="flex justify-center flex-1 h-full overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </CreateSubtaskContextProvider>
  );
};

export default AppLayout;
