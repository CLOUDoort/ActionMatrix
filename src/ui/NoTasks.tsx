import { useAuthContext } from '@/authentication/AuthContext';
import Button from './Button';
import { HiOutlineFolderPlus } from 'react-icons/hi2';
import { HiOutlinePlus } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const NoTasks = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const {
    auth: { version },
  } = useAuthContext();
  return (
    <div className="flex items-center justify-center h-full p-10">
      <div className="flex flex-col items-center justify-center w-56 gap-5">
        <HiOutlineFolderPlus className="lg:size-20 size-16" />
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-h4 lg:text-h3 text-Button">No Tasks</h2>
          <p className="mb-3">There is no {type} task</p>
          {type === 'Todo' && (
            <Button name="create" handler={() => navigate(`/${version}/create`)}>
              <HiOutlinePlus size={20} />
              <span>New Task</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoTasks;
