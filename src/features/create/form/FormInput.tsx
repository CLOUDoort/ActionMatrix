import type { Inputs } from 'Create';
import { UseFormRegister } from 'react-hook-form';

export const TitleInput = ({ register }: { register: UseFormRegister<Inputs> }) => {
  return (
    <input
      type="text"
      id="title"
      className="p-2 border-2 rounded-md border-slate-200"
      placeholder="title"
      {...register('title', {
        required: 'title is required',
        maxLength: {
          value: 20,
          message: 'The maximum length of the title is 20',
        },
      })}
    />
  );
};

export const DetailsInput = ({ register }: { register: UseFormRegister<Inputs> }) => {
  return (
    <textarea
      id="details"
      className="p-2 border-2 rounded-md border-slate-200 min-h-20"
      placeholder="detail"
      {...register('details', {
        required: 'details is required',
        maxLength: {
          value: 100,
          message: 'The maximum length of the details is 200',
        },
      })}
    />
  );
};
