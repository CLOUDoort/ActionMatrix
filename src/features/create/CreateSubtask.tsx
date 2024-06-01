import { useEffect, useState } from 'react';

import Button from '../../ui/Button';
import CreateSubtaskList from './CreateSubtaskList';
import { HiOutlinePlus } from 'react-icons/hi';
import CreateSubtaskForm from './form/CreateSubtaskForm';
import type { CreateSubtaskProps } from 'Create';

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
      className={`flex-1 w-full p-8 space-y-5 border rounded-md min-w-96 min-h-[32.625rem] border-slate-200 h-full ${option ? 'opacity-60 cursor-not-allowed' : ''} overflow-y-scroll`}
      onClick={clickDisabledBtn}
    >
      <h1 className="text-h4">Subtask</h1>
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
