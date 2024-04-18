import Button from './Button';
import { HiOutlinePlus } from 'react-icons/hi';
import { VscEmptyWindow } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

const NoTasks = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-56 gap-6">
      <VscEmptyWindow className="lg:size-20 size-16" />
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-h4 lg:text-h3 text-Button">No Tasks</h2>
        <p className="mb-5">There is no pending task</p>
        <Button type="create" handler={() => navigate('/app/create')}>
          <HiOutlinePlus size={20} />
          <span>New Task</span>
        </Button>
      </div>
    </div>
  );
};

export default NoTasks;
