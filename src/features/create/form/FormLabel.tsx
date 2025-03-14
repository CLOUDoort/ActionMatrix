import type { FormLabelProps } from 'Create';

const FormLabel = ({ name, children, error }: FormLabelProps) => {
  return (
    <div className={`flex flex-col gap-2`}>
      {name && (
        <label htmlFor={name} className="text-base md:text-h5">
          {name}
        </label>
      )}
      {children}
      {error && <span className="ml-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormLabel;
