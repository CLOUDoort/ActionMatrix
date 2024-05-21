import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from './Button';
import { HiOutlinePlus } from 'react-icons/hi2';
import { ReactNode } from 'react';
import Tag from './Tag';

const AppMain = ({ children, name }: { children: ReactNode; name: string }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const priority = searchParams.get('priority');
  const difficulty = searchParams.get('difficulty');

  const priorityHandler = () => {
    if (difficulty) setSearchParams({ difficulty });
    else setSearchParams({});
  };
  const difficultyHandler = () => {
    if (priority) setSearchParams({ priority });
    else setSearchParams({});
  };

  return (
    <section className="flex flex-col w-full h-full gap-3 px-5 py-10 lg:px-14 max-w-7xl min-w-[20rem]">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 sm:text-h4 text-h5">
        <div className="flex items-center gap-4 whitespace-nowrap">
          <span className="">{name}</span>
          <span className="flex flex-col justify-center gap-2 px-2 text-sm sm:flex-col">
            {priority && <Tag type={priority} handler={priorityHandler} />}
            {difficulty && <Tag type={difficulty} handler={difficultyHandler} />}
          </span>
        </div>
        <Button type="create" handler={() => navigate('/app/create')}>
          <HiOutlinePlus size={20} />
          <span>New Task</span>
        </Button>
      </div>
      <div className={`flex-1 w-full flex flex-col`}>{children}</div>
    </section>
  );
};

export default AppMain;
