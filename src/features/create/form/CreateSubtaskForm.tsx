import type { CreateSubtaskFormProps, Inputs } from 'Create';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DetailsInput, TitleInput } from './FormInput';

import Button from '@/ui/Button';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateSubtask } from '../CreateSubtaskContext';
import FormLabel from './FormLabel';
import FormTag from './FormTag';

const CreateSubtaskForm = ({ priority, handleFormState, update }: CreateSubtaskFormProps) => {
  const { createSubtask, updateSubtask } = useCreateSubtask();
  const [difficulty, setDifficulty] = useState(update ? update.difficulty : 'hard');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: update ? update?.title : '',
      details: update ? update?.details : '',
    },
  });

  const handleReset = () => {
    reset();
    setDifficulty('hard');
    handleFormState();
  };

  const onSubmit: SubmitHandler<Inputs> = ({ title, details }) => {
    if (!title || !details) {
      toast.error('Not enough content!');
      return;
    }

    if (update) {
      if (title === update.title && details === update.details && difficulty === update.difficulty) {
        toast.error('No changes have been made!');
        reset();
        return;
      }

      updateSubtask(update, {
        ...update,
        title,
        details,
        difficulty,
      });
    } else {
      createSubtask({
        id: nanoid(8),
        title,
        details,
        difficulty,
        priority,
        complete: false,
        taskId: '',
      });
    }
    handleReset();
  };

  return (
    <form
      className="flex flex-col w-full gap-2 p-8 border rounded-md border-slate-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel>
        <FormLabel error={errors.title?.message as string}>
          <TitleInput register={register} />
        </FormLabel>
        <FormLabel error={errors.details?.message as string}>
          <DetailsInput register={register} />
        </FormLabel>
      </FormLabel>
      <FormTag tag="difficulty" select={difficulty} handler={setDifficulty} />
      <div className="flex justify-end gap-2">
        <Button name="cancel" handler={handleReset}>
          Cancel
        </Button>
        <Button name="save" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateSubtaskForm;
