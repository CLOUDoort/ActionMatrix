import Button from './Button';
import { FcGoogle } from 'react-icons/fc';
import HomeFeature from './HomeFeature';
import { googleLogin } from '@/authentication/googleLogin';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center w-full">
      <div className="max-w-7xl min-w-[22rem]">
        <header className="flex items-center gap-2 p-5 lg:gap-3">
          <img src="/Logo.png" alt="Logo" className="size-3 sm:size-5 md:size-7 lg:size-10" />
          <h4 className="text-sm sm:text-base md:text-h5 lg:text-h4">ActionMatrix</h4>
        </header>

        <main className="flex flex-col items-center justify-center w-full h-full gap-10 p-5 text-center">
          <div className="mt-3 space-y-3 tracking-wider lg:mt-10">
            <h2 className="text-h5 sm:text-h4 md:text-h3 lg:text-h2">Prioritize Your Work</h2>
            <h4 className="text-sm sm:text-base md:text-h5 lg:text-h4 text-slate-500">
              start with something that's really important but easy task.
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:mb-10">
            <Button handler={() => navigate('/app/todo')} type="try">
              Try a Demo
            </Button>
            <Button handler={googleLogin} type="google">
              <div className="flex items-center justify-center gap-3 whitespace-nowrap">
                <FcGoogle className="size-4 lg:size-5" /> Start with Google
              </div>
            </Button>
          </div>

          <figure className="w-[90%] sm:mt-10">
            <img className="border-2 rounded-2xl" src="/task.png" alt="task" />
          </figure>

          <HomeFeature />

          <footer className="flex items-center justify-center py-5 text-xs sm:text-base">
            Copyright 2024. KangJunSeok All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
