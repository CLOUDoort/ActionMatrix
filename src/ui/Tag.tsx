import { ucFirst } from '../utils/ucFirst';

const Tag = ({ type }: { type: string }) => {
  const tagType = ucFirst(type);
  const style: { [key: string]: string } = {
    high: 'bg-High3',
    hard: 'bg-High3',
    medium: 'bg-Medium3',
    normal: 'bg-Medium3',
    low: 'bg-Low3',
    easy: 'bg-Low3',
  };
  return (
    <span className={`px-3 py-2 rounded ${style[tagType]} text-h5`}>
      # {tagType}
    </span>
  );
};

export default Tag;
