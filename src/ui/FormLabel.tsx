import { ReactNode } from 'react';

const FormLabel = ({ name, children }: { name: string; children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="title" className="text-h5">
        {name}
      </label>
      {children}
    </div>
  );
};

export default FormLabel;
