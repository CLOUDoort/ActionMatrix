import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Button from '../../ui/Button';
import CreateSubtaskList from './CreateSubtaskList';
import { HiOutlinePlus } from 'react-icons/hi';
import type { SubtaskFormItem } from 'Form';
import Tag from '../../ui/Tag';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useCreateSubtask } from './CreateSubtaskContext';

interface CreateSubtaskProps {
  priority: string;
  option: boolean;
  flashHandler: Dispatch<SetStateAction<boolean>>;
}

const initialFormState: SubtaskFormItem = {
  title: '',
  details: '',
  difficulty: 'hard',
};

const CreateSubtask = ({ priority, option, flashHandler }: CreateSubtaskProps) => {
  const { createSubtask } = useCreateSubtask();
  const [form, setForm] = useState(initialFormState);
  const [buttonState, setButtonState] = useState<boolean>(false);
  const { title, details, difficulty } = form;

  const handleState = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const clickDisabledBtn = () => {
    if (option) {
      flashHandler(true);
      setTimeout(() => {
        flashHandler(false);
      }, 400);
      return;
    }
  };

  const clickSubtask = () => {
    if (!option) setButtonState((state) => !state);
  };

  const reset = () => {
    setButtonState(false);
    setForm(initialFormState);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !details) {
      toast.error('Not enough content!');
      return;
    }
    createSubtask({
      id: nanoid(8),
      title,
      details,
      difficulty,
      priority,
      complete: false,
      taskId: '',
    });
    reset();
  };

  useEffect(() => setButtonState(false), [option]);

  return (
    <div
      className={`flex-1 w-full p-8 space-y-5 border rounded-md min-w-96 min-h-[32.625rem] border-slate-200 h-full ${option ? 'opacity-60 cursor-not-allowed' : ''} overflow-y-scroll`}
      onClick={clickDisabledBtn}
    >
      <h1 className="text-h4">Subtask</h1>
      <CreateSubtaskList option={option} />

      {/* New Subtask Button */}
      <Button type="subtask" conditionStyle={option ? 'cursor-not-allowed' : ''} handler={clickSubtask}>
        <HiOutlinePlus size={20} />
        <span>New Subtask</span>
      </Button>

      {buttonState && (
        <form
          className="w-full p-8 flex flex-col gap-2 border rounded-md border-slate-200 min-w-[25rem]"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="title"
              className="p-2 border-2 rounded-md border-slate-200"
              placeholder="Title"
              value={title}
              onChange={(e) => handleState('title', e.target.value)}
            />
            <textarea
              id="details"
              className="p-2 border-2 rounded-md border-slate-200 min-h-20"
              placeholder="details"
              value={details}
              onChange={(e) => handleState('details', e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Tag type="hard" select={difficulty} handler={() => handleState('difficulty', 'hard')} />
            <Tag type="normal" select={difficulty} handler={() => handleState('difficulty', 'normal')} />
            <Tag type="easy" select={difficulty} handler={() => handleState('difficulty', 'easy')} />
          </div>
          <div className="flex justify-end gap-2">
            <Button handler={reset} type="cancel">
              Cancel
            </Button>
            <Button submit={true} type="save" handler={submitHandler}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateSubtask;
