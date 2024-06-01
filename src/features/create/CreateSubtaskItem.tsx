import { LuDot } from 'react-icons/lu';
import type { SubtaskItem } from 'Task';
import { TiDelete } from 'react-icons/ti';
import { useCreateSubtask } from './CreateSubtaskContext';
import { useState } from 'react';
import CreateSubtaskForm from './form/CreateSubtaskForm';

const CreateSubtaskItem = ({ subtask }: { subtask: SubtaskItem }) => {
  const { deleteSubtask } = useCreateSubtask();
  const [showForm, setShowForm] = useState(false);
  const handleFormState = () => setShowForm((state) => !state);

  return (
    <>
      <li
        onClick={() => setShowForm(true)}
        className="flex items-center justify-between p-2 transition-all rounded cursor-pointer hover:bg-slate-100"
      >
        <div className="flex items-center w-full gap-1">
          <LuDot size={21} />
          <div>{subtask.title}</div>
        </div>
        <TiDelete className="cursor-pointer" size={25} onClick={() => deleteSubtask(subtask)} />
      </li>
      {showForm && <CreateSubtaskForm priority={subtask.priority} handleFormState={handleFormState} update={subtask} />}
    </>
  );
};

export default CreateSubtaskItem;
