import Button from './Button';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';

const AppMain = ({ children, name }: { children: ReactNode; name: string }) => {
  const navigate = useNavigate();
  return (
    <div className="grid w-full h-full grid-rows-[auto_1fr] gap-5 px-8 py-10 max-w-7xl lg:px-16">
      <div className="flex items-center justify-between h-16 pb-5 md:text-h3 text-h4 ">
        <span>{name}</span>
        <Button type="create" handler={() => navigate('/app/create')}>
          <HiOutlinePlus size={20} />
          <span>New Task</span>
        </Button>
      </div>
      <div className="flex flex-col 2xl:pb-28">{children}</div>
    </div>
  );
};

export default AppMain;
