import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateSubtask } from '../CreateSubtaskContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import LabelForm from './LabelForm';
import { DetailsInput, TitleInput } from './InputForm';
import Button from '@/ui/Button';
import type { CreateSubtaskFormProps, Inputs } from 'Create';
import TagForm from './TagForm';

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
      className="w-full p-8 flex flex-col gap-2 border rounded-md border-slate-200 min-w-[25rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LabelForm>
        <LabelForm error={errors.title?.message as string}>
          <TitleInput register={register} />
        </LabelForm>
        <LabelForm error={errors.details?.message as string}>
          <DetailsInput register={register} />
        </LabelForm>
      </LabelForm>
      <TagForm tag="difficulty" select={difficulty} handler={setDifficulty} />
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
