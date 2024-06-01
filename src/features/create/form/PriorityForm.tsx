import Tag from '@/ui/Tag';
import type { PriorityFormProps } from 'Create';

const PriorityForm = ({ priority, handlePriority }: PriorityFormProps) => {
  return (
    <div className="flex gap-2">
      <Tag type="high" select={priority} handler={() => handlePriority('high')} />
      <Tag type="medium" select={priority} handler={() => handlePriority('medium')} />
      <Tag type="low" select={priority} handler={() => handlePriority('low')} />
    </div>
  );
};

export default PriorityForm;
