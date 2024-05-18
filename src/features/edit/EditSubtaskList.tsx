import Tag from '../../ui/Tag';
import type { SubtaskItem } from 'Task';
import { useEditSubtask } from './EditSubtaskContext';
import EditSubtaskItem from './EditSubtaskItem';

const EditSubtaskList = ({ option }: { option: boolean }) => {
  const { subtask } = useEditSubtask();
  return (
    <>
      {Object.keys(subtask)
        .filter((el) => subtask[el].length !== 0)
        .map((key: string) => (
          <div className={`space-y-5 ${option ? 'pointer-events-none' : ''}`} key={key}>
            <Tag type={key} select={key} />
            <ul className="space-y-1">
              {subtask[key].map((item: SubtaskItem) => (
                <EditSubtaskItem subtask={item} key={item.id} />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default EditSubtaskList;
