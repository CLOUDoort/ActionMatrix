import Tag from '@/ui/Tag';
import type { DifficultyFormProps } from 'Create';

const DifficultyForm = ({ difficulty, handleDifficulty }: DifficultyFormProps) => {
  return (
    <div className="flex gap-2">
      <Tag type="hard" select={difficulty} handler={() => handleDifficulty('hard')} />
      <Tag type="normal" select={difficulty} handler={() => handleDifficulty('normal')} />
      <Tag type="easy" select={difficulty} handler={() => handleDifficulty('easy')} />
    </div>
  );
};

export default DifficultyForm;
