import { LuDot } from 'react-icons/lu';
import { SubtaskItemInterface } from './CreateSubtask';
import { TiDelete } from 'react-icons/ti';

const SubtaskItem = ({
  task,
  deleteSubtask,
}: {
  task: SubtaskItemInterface;
  deleteSubtask: (diff: string, id: string) => void;
}) => {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LuDot size={21} />
        <div>{task.title}</div>
      </div>
      <TiDelete
        className="cursor-pointer"
        size={25}
        onClick={() => deleteSubtask(task.difficulty, task.id)}
      />
    </li>
  );
};

export default SubtaskItem;
