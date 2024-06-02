import Button from '@/ui/Button';
import type { Focus } from 'Task';
import Tag from '@/ui/Tag';
import ItemLabel from '@/ui/ItemLabel';

const FocusTask = ({ focus, handleFinish }: { focus: Focus; handleFinish: () => void }) => {
  const { title, details, priority, difficulty } = focus;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col justify-between items-center bg-slate-50 max-w-[37.5rem] min-w-[25rem] min-h-[30rem] max-h-[40.625rem] w-[50%] h-[70%] rounded py-8 px-10">
        <div className="flex items-center justify-end w-full gap-2">
          <div className="flex flex-col w-full gap-7">
            <h1 className="text-[3.5rem] text-center mb-3">FOCUS</h1>
            <ItemLabel name="Title">
              <span className="flex-1 font-paragraph">{title}</span>
            </ItemLabel>
            <ItemLabel name="Details">
              <span className="flex-grow break-all font-paragraph">{details}</span>
            </ItemLabel>
            <ItemLabel name="Priority">
              <span className="font-paragraph">
                <Tag type={priority} button={false} />
              </span>
            </ItemLabel>
            <ItemLabel name="Difficulty">
              <span className="font-paragraph">
                <Tag type={difficulty} button={false} />
              </span>
            </ItemLabel>
          </div>
        </div>
        <Button name="focus" handler={handleFinish} conditionStyle="w-full">
          Finish
        </Button>
      </div>
    </div>
  );
};

export default FocusTask;
