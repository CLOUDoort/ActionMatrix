import type { Focus, SubtaskItem } from 'Task';

import Button from '@/ui/Button';
import { LuDot } from 'react-icons/lu';

const TaskDetailsSubtaskItem = ({
  subtask,
  focusHandler,
}: {
  subtask: SubtaskItem;
  focusHandler: (type: string, item: Focus) => void;
}) => {
  const { id, taskId, title, details, priority, difficulty, complete } = subtask;

  const focusSubtask: Focus = {
    id,
    taskId,
    title,
    details,
    priority,
    difficulty,
  };

  return (
    <li className={`flex items-center justify-between gap-2 p-1 rounded ${complete ? 'text-slate-400' : ''}`}>
      <div className="flex items-center">
        <LuDot size={30} />
        <span>{subtask.title}</span>
      </div>
      <Button
        name={complete ? 'optionfalse' : 'focus'}
        handler={() => focusHandler('subtask', focusSubtask)}
        disabled={complete}
      >
        {complete ? 'Completed' : 'Focus'}
      </Button>
    </li>
  );
};

export default TaskDetailsSubtaskItem;
