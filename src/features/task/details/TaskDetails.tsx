import type { Focus, SubtaskItem, Task } from 'Task';
import { finishSubtask, finishTask } from '@/services/apiTasks';

import Button from '@/ui/Button';
import FocusTask from '../../focus/FocusTask';
import { HiOutlineXMark } from 'react-icons/hi2';
import { Progress } from '@/components/ui/progress';
import Tag from '@/ui/Tag';
import TaskDetailsSubtaskItem from './TaskDetailsSubtaskItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const initialState = {
  type: '',
  item: {
    id: '',
    taskId: '',
    title: '',
    details: '',
    priority: '',
    difficulty: '',
  },
};

interface TaskDetailsProps {
  task: Task;
  handleDetailState: () => void;
}

const TaskDetails = ({ task, handleDetailState }: TaskDetailsProps) => {
  const { id, title, details, progress, priority, difficulty, subtask } = task;
  const [focus, setFocus] = useState(initialState);
  const { type, item } = focus;
  const taskType = task.progress === 100 ? 'done' : 'todo';
  const navigate = useNavigate();
  const focusTask: Focus = {
    id,
    taskId: id,
    title,
    details,
    priority,
    difficulty: difficulty !== undefined ? difficulty : '',
  };

  const focusHandler = (type: string, item: Focus) => setFocus({ type, item });

  const finishHandler = () => {
    if (type === 'task') {
      finishTask(item);
      navigate('/app/done');
      toast.success(`Finish ${item.title}`);
    } else {
      // subtask가 모두 끝났을 때
      if (finishSubtask(item)) {
        navigate('/app/done');
        toast.success(`Finish ${title}`);
      } else {
        navigate('/app/todo');
        toast.success(`Finish ${item.title}`);
      }
    }
    setFocus(initialState);
  };
  return (
    <div className={`absolute inset-0 z-10 bg-black/20`} onClick={handleDetailState}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`min-w-[30rem] w-[25%] inset-y-0 right-0 absolute border-l-2 border-slate-200 bg-white overflow-y-scroll pb-10`}
      >
        <div className="flex flex-col w-full gap-6 px-8 py-10">
          <div className="flex items-center justify-between">
            <h3 className="lg:text-h3 text-h4">Task Details</h3>
            <HiOutlineXMark size={25} className="cursor-pointer" onClick={handleDetailState} />
          </div>
          <div className="flex items-center gap-5">
            <span className="min-w-20 text-h5">Title</span>
            <span className="flex-1 font-paragraph">{title}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="min-w-20 text-h5">Details</span>
            <span className="break-all font-paragraph">{details}</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="min-w-20 text-h5">Progress</span>
            <div className="flex items-center gap-2 pr-5 rounded w-28 sm:w-40 md:w-48">
              <Progress value={progress} />
              <span className="font-paragraph">{progress}%</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <span className="min-w-20 text-h5">Priority</span>
            <span className="font-paragraph">
              <Tag type={priority} button={false} />
            </span>
          </div>
          {difficulty && (
            <div className="flex items-center gap-5">
              <span className="w-20 text-h5">Difficulty</span>
              <span className="font-paragraph">
                <Tag type={difficulty} button={false} />
              </span>
            </div>
          )}
          {subtask && (
            <div className="flex flex-col gap-5">
              <span className="w-20 text-h5">Subtask</span>
              {Object.keys(subtask)
                .filter((el) => subtask[el].length !== 0)
                .map((key: string) => (
                  <div className="space-y-3 font-paragraph" key={key}>
                    <Tag type={key} button={false} />
                    <ul className="space-y-1">
                      {subtask[key].map((item: SubtaskItem) => (
                        <TaskDetailsSubtaskItem focusHandler={focusHandler} subtask={item} key={item.id} />
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="flex items-center w-full gap-2 px-8">
          <Button type="edit" handler={() => navigate(`/app/edit/${taskType}/${id}`)}>
            Edit
          </Button>
          {difficulty && (
            <Button type="focus" handler={() => focusHandler('task', focusTask)} conditionStyle="w-full">
              Focus
            </Button>
          )}
        </div>
      </div>
      {focus.type !== '' && <FocusTask handleFinish={finishHandler} focus={focus.item} />}
    </div>
  );
};

export default TaskDetails;
