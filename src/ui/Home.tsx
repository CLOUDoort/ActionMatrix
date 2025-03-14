import { googleLogin } from '@/authentication/googleLogin';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from './Button';
import HomeFeature from './HomeFeature';

const Home = () => {
  const navigate = useNavigate();

  const clickDemo = () => {
    navigate('/demo/task/todo');
  };

  const clickGoogleLogin = () => {
    toast.info("Only the demo version is available.");
    return;
    googleLogin();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="max-w-7xl min-w-[22rem]">
        <header className="flex items-center gap-2 p-5 lg:gap-3">
          <img src="/Logo.png" alt="Logo" className="size-5 md:size-7 lg:size-10" />
          <h4 className="text-base md:text-h5 lg:text-h4">ActionMatrix</h4>
        </header>

        <main className="flex flex-col items-center justify-center w-full h-full gap-10 p-5 text-center">
          <div className="mt-3 space-y-3 tracking-wider lg:mt-10">
            <h2 className="text-h5 sm:text-h4 md:text-h3 lg:text-h2">Prioritize Your Work</h2>
            <h4 className="text-sm sm:text-base md:text-h5 lg:text-h4 text-slate-500">
              start with something that's really important but easy task.
            </h4>
          </div>

          <div className="flex items-center justify-center gap-5 sm:mb-10">
            <Button handler={clickDemo} name="try">
              Try a Demo
            </Button>
            <Button handler={clickGoogleLogin} name="google">
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
            Copyright 2025. KangJunSeok All Rights Reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Home;
