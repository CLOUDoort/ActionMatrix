import { DetailsInput, TitleInput } from './form/InputForm';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import CreateSubtask from './CreateSubtask';
import LabelForm from '@/features/create/form/LabelForm';
import type { SubtaskItem } from 'Task';
import { createTask } from '../../services/apiCreateTask';
import { formattedDate } from '@/utils/formattedDate';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useCreateSubtask } from './CreateSubtaskContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Inputs } from 'Create';
import TagForm from './form/TagForm';

const CreateTaskForm = () => {
  const navigate = useNavigate();
  const { subtask, clearSubtask } = useCreateSubtask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [flashBorder, setFlashBorder] = useState(false);
  const [option, setOption] = useState(true);
  const [priority, setPriority] = useState('high');
  const [difficulty, setDifficulty] = useState('hard');

  const handleReset = () => {
    clearSubtask();
    setOption(true);
    setPriority('high');
    setDifficulty('hard');
    reset();
  };

  const handleCancel = () => {
    handleReset();
    navigate(-1);
  };

  const onSubmit: SubmitHandler<Inputs> = ({ title, details }) => {
    if (!title || !details) {
      toast.error('Not enough content!');
      return null;
    }

    const taskId = nanoid(8);
    const createdAt = formattedDate(new Date());
    const base = { id: taskId, title, details, priority, progress: 0, createdAt };

    let task;
    if (option) task = { ...base, difficulty };
    else {
      const subtaskNum = Object.keys(subtask).reduce((acc, cur) => acc + subtask[cur].length, 0);
      if (subtaskNum === 0) {
        toast.error('Add subtask!');
        return null;
      }
      Object.keys(subtask)
        .filter((el) => subtask[el].length !== 0)
        .forEach((key) => {
          subtask[key] = subtask[key].map((item: SubtaskItem) => {
            return { ...item, taskId };
          });
        });
      task = { ...base, subtask, subtaskNum, completedSubtaskNum: 0 };
    }

    createTask('todo', task);
    handleReset();

    toast.success('Create Task!');
    navigate('/app/todo');
  };

  return (
    <section className="flex flex-col w-full max-h-[50rem] gap-3 px-5 py-9 lg:px-14 max-w-7xl">
      <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4 ">
        <p>New Task</p>
      </div>
      <div className={`flex-1 flex gap-5 xl:flex-row flex-col pb-10`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-8 space-y-4 border rounded-md border-slate-200 xl:w-[29rem] min-w-[25rem] h-full"
        >
          <LabelForm name="Title" error={errors.title?.message}>
            <TitleInput register={register} />
          </LabelForm>
          <LabelForm name="Details" error={errors.details?.message}>
            <DetailsInput register={register} />
          </LabelForm>
          <LabelForm name="Priority">
            <TagForm tag="priority" select={priority} handler={setPriority} />
          </LabelForm>
          <LabelForm name="Options">
            <div className="flex gap-2">
              <Button name={`option${option}`} handler={() => setOption(true)}>
                Difficulty
              </Button>
              <Button
                name={`option${!option}`}
                handler={() => setOption(false)}
                conditionStyle={`${flashBorder ? 'border-red-400 bg-red-300' : ''}`}
              >
                Divide
              </Button>
            </div>
            {option && <TagForm tag="difficulty" select={difficulty} handler={setDifficulty} />}
          </LabelForm>
          <div className="flex justify-end gap-2">
            <Button name="cancel" handler={handleCancel}>
              Cancel
            </Button>
            <Button name="save" type="submit">
              Save
            </Button>
          </div>
        </form>
        <CreateSubtask priority={priority} option={option} flashHandler={setFlashBorder} />
      </div>
    </section>
  );
};

export default CreateTaskForm;
