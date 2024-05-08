import CreateSubtaskItem from './CreateSubtaskItem';
import Tag from '../../ui/Tag';
import { useCreateSubtask } from './CreateSubtaskContext';
import type { SubtaskItem } from 'Task';

const CreateSubtaskList = () => {
  const { subtask } = useCreateSubtask();
  return (
    <>
      {Object.keys(subtask)
        .filter((el) => subtask[el].length !== 0)
        .map((key: string) => (
          <div className="space-y-5" key={key}>
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
