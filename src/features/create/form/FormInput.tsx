import type { Inputs } from 'Create';
import { UseFormRegister } from 'react-hook-form';

export const TitleInput = ({ register }: { register: UseFormRegister<Inputs> }) => {
  return (
    <input
      type="text"
      id="title"
      className="p-2 text-xs border rounded-md md:p-3 md:border-2 border-slate-200 lg:text-base"
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
      className="p-2 text-xs border rounded-md md:p-3 md:border-2 border-slate-200 min-h-10 md:min-h-20 lg:text-base"
      placeholder="details"
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
