import AppMain from '../../ui/AppMain';
import Button from '../../ui/Button';
import CreateSubtask from './CreateSubtask';
import Tag from '../../ui/Tag';
import type { TaskForm } from 'Form';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreateSubtask } from './CreateSubtaskContext';
import { toast } from 'react-toastify';
import { createTask } from '../../services/apiCreateTask';

const initialFormState: TaskForm = {
  title: '',
  details: '',
  priority: 'high',
  option: true,
  difficulty: 'hard',
};

const CreateTask = () => {
  const navigate = useNavigate();
  const [flashBorder, setFlashBorder] = useState(false);
  const [state, setState] = useState(initialFormState);
  const { title, details, priority, option, difficulty } = state;
  const { subtask, clearSubtask } = useCreateSubtask();

  const handleState = (key: string, value: string | boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !details) {
      toast.error('Not enough content!');
      return;
    }

    const baseTask = { id: nanoid(8), title, details, priority, progress: 0 };
    const newTask = option ? { ...baseTask, difficulty } : { ...baseTask, subtask };
    createTask('todo', newTask);
    clearSubtask();
    toast.success('Create Task Success!');
    navigate('/app/todo', { replace: true });
  };

  return (
    <section className="flex flex-col w-full h-full gap-3 px-5 py-10 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4 ">
        <p>New Task</p>
      </div>
      <div className={`flex-1 flex h-full gap-5`}>
        <form
          onSubmit={submitHandler}
          className="w-full p-8 space-y-4 border rounded-md border-slate-200 xl:w-[29rem] min-w-[25rem] h-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-h5">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="p-2 border-2 rounded-md border-slate-200"
              placeholder="Title"
              value={title}
              onChange={(e) => handleState('title', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="details" className="text-h5">
              Details
            </label>
            <textarea
              id="details"
              className="p-2 border-2 rounded-md border-slate-200 min-h-20"
              placeholder="Details"
              value={details}
              onChange={(e) => handleState('details', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-h5">Priority</div>
            <div className="flex gap-2">
              <Tag type="high" select={priority} handler={() => handleState('priority', 'high')} />
              <Tag type="medium" select={priority} handler={() => handleState('priority', 'medium')} />
              <Tag type="low" select={priority} handler={() => handleState('priority', 'low')} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-h5">Options</div>
            <div className="flex gap-2">
              <Button type={`option${option}`} handler={() => handleState('option', true)}>
                Difficulty
              </Button>
              <Button
                type={`option${!option}`}
                handler={() => handleState('option', false)}
                additionalStyle={`${flashBorder ? 'border-red-900 bg-red-200' : ''}`}
              >
                Subtask
              </Button>
            </div>
            {option && (
              <div className="flex gap-2">
                <Tag type="hard" select={difficulty} handler={() => handleState('difficulty', 'hard')} />
                <Tag type="normal" select={difficulty} handler={() => handleState('difficulty', 'normal')} />
                <Tag type="easy" select={difficulty} handler={() => handleState('difficulty', 'easy')} />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="cancel" handler={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="save" submit={true} handler={submitHandler}>
              Save
            </Button>
          </div>
        </form>
        <CreateSubtask priority={priority} option={option} flashHandler={setFlashBorder} />
      </div>
    </section>
  );
};

export default CreateTask;
