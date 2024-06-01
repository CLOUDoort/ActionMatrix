import Tag from '@/ui/Tag';
import type { TagFormProps } from 'Create';

const tagTypes: { [key: string]: string[] } = {
  priority: ['high', 'medium', 'low'],
  difficulty: ['hard', 'normal', 'easy'],
};

const TagForm = ({ tag, handler, select }: TagFormProps) => {
  return (
    <div className="flex gap-2">
      {tagTypes[tag].map((el) => (
        <Tag key={el} type={el} select={select} handler={() => handler(el)} />
      ))}
    </div>
  );
};

export default TagForm;
