import SubtaskItem from './CreateSubtaskItem';
import Tag from '../../ui/Tag';
import { useSubtask } from './SubtaskContext';
import { SubtaskItemInterface } from 'Task';

const CreateSubtaskList = () => {
  const { subtask } = useSubtask();
  return (
    <>
      {Object.keys(subtask)
        .filter((el) => subtask[el].length !== 0)
        .map((key: string) => (
          <div className="space-y-5" key={key}>
            <Tag type={key} select={key} />
            <ul className="space-y-1">
              {subtask[key].map((item: SubtaskItemInterface) => (
                <SubtaskItem subtask={item} key={item.id} />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default CreateSubtaskList;
