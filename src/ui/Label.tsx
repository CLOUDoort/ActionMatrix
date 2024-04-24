const Label = ({ type }: { type: string }) => {
  const base = ['Title', 'Progress', 'Priority'];
  const items: { [key: string]: string[] } = {
    default: [...base, 'Difficulty / Subtask'],
    filter: [...base, 'Difficulty'],
    detail: base,
  };
  return (
    <div className="flex w-full text-sm border-b-2 h-11 whitespace-nowrap lg:text-h5 border-slate-200">
      {items[type].map((item: string) => (
        <div key={item} className="w-24 lg:w-52">
          {item}
        </div>
      ))}
    </div>
  );
};

export default Label;
