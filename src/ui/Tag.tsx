import { ucFirst } from '../utils/ucFirst';

const base = 'px-3 sm:py-2  py-1 rounded border-2 rounded-md transition-all sm:text-base text-xs ';

const style: { [key: string]: string } = {
  high: base + 'bg-High',
  hard: base + 'bg-High',
  medium: base + 'bg-Medium',
  normal: base + 'bg-Medium',
  low: base + 'bg-Low',
  easy: base + 'bg-Low',
  none: base + 'text-slate-400',
};

const Tag = ({
  type,
  select = type,
  button = true,
  handler,
}: {
  type: string;
  select?: string;
  button?: boolean;
  handler?: () => void;
}) => {
  const tagType = ucFirst(type);

  return (
    <span
      className={`${type === select ? style[type] + ' border-black' : style['none']} ${button ? 'cursor-pointer' : ''} `}
      onClick={handler}
    >
      # {tagType}
    </span>
  );
};

export default Tag;
