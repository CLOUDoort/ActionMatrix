import CreateSubtaskItem from './CreateSubtaskItem';
import Tag from '../../ui/Tag';
import { useCreateSubtask } from './CreateSubtaskContext';
import type { SubtaskItem } from 'Task';
import { filterSubtask } from '@/utils/filterSubtask';

const CreateSubtaskList = ({ option }: { option: boolean }) => {
  const { subtask } = useCreateSubtask();
  const filtered = filterSubtask(subtask);
  return (
    <>
      {filtered.map((key: string) => (
        <div className={`space-y-5 ${option ? 'pointer-events-none' : ''}`} key={key}>
          <Tag type={key} select={key} />
          <ul className="space-y-1">
            {subtask[key].map((item: SubtaskItem) => (
              <CreateSubtaskItem subtask={item} key={item.id} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default CreateSubtaskList;
