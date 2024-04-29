import { Dispatch, SetStateAction } from 'react';

import { SubtaskInterface } from './CreateSubtask';
import SubtaskItem from './SubtaskItem';
import { SubtaskItemInterface } from './CreateSubtask';
import Tag from '../../ui/Tag';

const SubtaskList = ({
  subtask,
  setSubtask,
}: {
  subtask: SubtaskInterface;
  setSubtask: Dispatch<SetStateAction<SubtaskInterface>>;
}) => {
  const deleteSubtask = (diff: string, id: string) => {
    setSubtask({
      ...subtask,
      [diff]: subtask[diff].filter((el) => el.id !== id),
    });
  };
  return (
    <>
      {Object.keys(subtask)
        .filter((el) => subtask[el].length !== 0)
        .map((key: string) => (
          <div className="space-y-5">
            <Tag type={key} select={key} />
            <ul className="space-y-1">
              {subtask[key].map((item: SubtaskItemInterface) => (
                <SubtaskItem
                  task={item}
                  key={item.id}
                  deleteSubtask={deleteSubtask}
                />
              ))}
            </ul>
          </div>
        ))}
    </>
  );
};

export default SubtaskList;
