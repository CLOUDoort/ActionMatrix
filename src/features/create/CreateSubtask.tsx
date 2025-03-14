import { useEffect, useState } from 'react';

import type { CreateSubtaskProps } from 'Create';
import { HiOutlinePlus } from 'react-icons/hi';
import Button from '../../ui/Button';
import CreateSubtaskList from './CreateSubtaskList';
import CreateSubtaskForm from './form/CreateSubtaskForm';

const CreateSubtask = ({ priority, option, flashHandler }: CreateSubtaskProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const handleFormState = () => setShowForm((state) => !state);

  const clickDisabledBtn = () => {
    if (option) {
      flashHandler(true);
      setTimeout(() => {
        flashHandler(false);
      }, 400);
    }
  };
  const clickSubtask = () => {
    if (!option) setShowForm((state) => !state);
  };
  useEffect(() => setShowForm(false), [option]);

  return (
    <div
      className={`flex-1 p-6 space-y-5 border rounded-md min-h-[32.625rem] xl:min-w-[400px] border-slate-200 h-full ${option ? 'opacity-60 cursor-not-allowed' : ''} overflow-y-scroll`}
      onClick={clickDisabledBtn}
    >
      <h1 className="text-base lg:text-h5">Subtask</h1>
      <CreateSubtaskList option={option} />

      {/* New Subtask Button */}
      <Button name="subtask" conditionStyle={option ? 'cursor-not-allowed' : ''} handler={clickSubtask}>
        <HiOutlinePlus size={20} />
        <span>New Subtask</span>
      </Button>

      {showForm && <CreateSubtaskForm priority={priority} handleFormState={handleFormState} />}
    </div>
  );
};

export default CreateSubtask;
