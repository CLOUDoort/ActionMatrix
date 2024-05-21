import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen p-5 overflow-hidden bg-gradient-to-r from-HomeFrom to-HomeTo">
      <header className="flex items-center w-full gap-3 ml-20 h-28 min-w-[12.5rem]">
        <img src="/Logo.png" alt="Logo" className="size-7 lg:size-10" />
        <h4 className="text-h5 lg:text-h4">ActionMatrix</h4>
      </header>
      <main className="flex flex-col min-w-[25rem] items-center justify-center h-full gap-20 mb-16 text-center">
        <div className="space-y-3 tracking-wider">
          <h1 className="text-h3 lg:text-h2">
            Prioritize Your Work Like <br /> Never Before!
          </h1>
          <h3 className="text-h5 lg:text-h4">
            start with something that's really <span className="text-High">important</span> but{' '}
            <span className="text-Low">easy</span> task.
          </h3>
        </div>
        <div className="space-x-6">
          <button
            onClick={() => navigate('/app/todo')}
            className="px-6 py-4 text-white transition-all duration-300 bg-blue-500 w-36 lg:px-8 lg:py-4 lg:text-h5 lg:w-44 rounded-xl hover:bg-blue-600 active:bg-blue-700"
          >
            Get Started
          </button>
          <button className="px-6 py-4 text-blue-500 transition-all duration-300 border-2 border-blue-500 w-36 lg:px-8 lg:py-4 lg:text-h5 lg:w-44 rounded-xl">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
