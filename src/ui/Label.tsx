const Label = () => {
  return (
    <div className="w-full text-base border-b-2 min-h-11 whitespace-nowrap md:text-h5 flex border-slate-200 min-w-[20rem]">
      <span className={`w-28 sm:w-40 md:w-48`}>Title</span>
      <span className={`w-28 sm:w-40 md:w-48`}>Progress</span>
      <span className={`w-28 sm:w-40 md:w-48`}>Priority</span>
      <span className={`hidden xl:block`}>Difficulty / Subtask</span>
    </div>
  );
};

export default Label;
