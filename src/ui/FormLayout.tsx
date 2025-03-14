import { CreateSubtaskContextProvider } from '@/features/create/CreateSubtaskContext';
import { ReactNode } from 'react';

const FormLayout = ({ children, name }: { children: ReactNode; name: string }) => {
  return (
    <CreateSubtaskContextProvider>
      <section className="flex flex-col w-full gap-3 px-5 py-9 lg:px-14">
        <div className="flex items-center justify-between h-16 pb-5 lg:text-h3 text-h4">
          <p>{name}</p>
        </div>
        {children}
      </section>
    </CreateSubtaskContextProvider>
  );
};

export default FormLayout;
