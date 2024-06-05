import { ReactNode } from 'react';

const ItemLabel = ({ name, children }: { name: string; children: ReactNode }) => {
  return (
    <div className="flex items-center gap-5">
      <span className="text-base font-semibold min-w-28 lg:text-h5">{name}</span>
      {children}
    </div>
  );
};

export default ItemLabel;
