import type { Focus, Subtask, SubtaskItem } from 'Task';

import Tag from '@/ui/Tag';
import TaskDetailsSubtaskItem from './TaskDetailsSubtaskItem';

const TaskDetailsSubtask = ({
  subtask,
  handler,
}: {
  subtask: Subtask;
  handler: (type: string, item: Focus) => void;
}) => {
  return (
    <>
      {Object.keys(subtask)
        .filter((el) => subtask[el].length !== 0)
        .map((key: string) => (
          <div className="space-y-3 font-paragraph" key={key}>
            <Tag type={key} button={false} />
            <ul className="space-y-1">
              {subtask[key].map((item: SubtaskItem) => (
                <TaskDetailsSubtaskItem focusHandler={handler} subtask={item} key={item.id} />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default TaskDetailsSubtask;
