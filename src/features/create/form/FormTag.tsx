import Tag from '@/ui/Tag';
import type { FormTagProps } from 'Create';

const tagTypes: { [key: string]: string[] } = {
  priority: ['high', 'medium', 'low'],
  difficulty: ['hard', 'normal', 'easy'],
};

const FormTag = ({ tag, handler, select }: FormTagProps) => {
  return (
    <div className="flex gap-2">
      {tagTypes[tag].map((el) => (
        <Tag key={el} type={el} select={select} handler={() => handler(el)} />
      ))}
    </div>
  );
};

export default FormTag;
