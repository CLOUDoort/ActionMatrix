import { ReactNode } from 'react';

const AppNavItem = ({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) => {
  return (
    <div className="w-full pb-4 space-y-3 border-b border-slate-200">
      <h4 className="text-left">{name}</h4>
      <div className="flex flex-col w-full gap-2">{children}</div>
    </div>
  );
};

export default AppNavItem;
