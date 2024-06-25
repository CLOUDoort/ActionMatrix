import { LoaderFunction, Outlet, useLoaderData, useNavigation } from 'react-router-dom';

import AppNav from './Navigation/AppNav';
import Loader from './Loader';
import { useAuth } from '@/authentication/useAuth';

const AppLayout = () => {
  const version = useLoaderData() as string;
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  useAuth(version);

  return (
    <div className="flex w-full h-screen">
      {isLoading && <Loader />}
      <AppNav />
      <main className="flex justify-center flex-1 h-full overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export const loader: LoaderFunction<any> = async ({ params }) => {
  const { version } = params;

  return version;
};

export default AppLayout;
