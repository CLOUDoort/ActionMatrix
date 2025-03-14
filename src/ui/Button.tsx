import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const base =
  'flex items-center gap-2 text-xs px-3 sm:text-base whitespace-nowrap py-2 sm:min-w-[5rem] rounded transition-all';
const homeButtonBase =
  'px-4 py-3 transition-all duration-300 md:px-6 md:py-4   lg:px-8 lg:py-5 text-sm md:text-h5 rounded-xl w-full';
const indigoButton = base + ' text-white justify-center bg-Indigo hover:bg-IndigoHover active:bg-IndigoActive';

const styles: { [key: string]: string } = {
  try: homeButtonBase + ' hover:bg-blue-600 active:bg-blue-700 bg-blue-500 text-white',
  google: homeButtonBase + ' text-blue-500 border-2 border-blue-500 hover:bg-slate-200 active:bg-slate-300',
  create: indigoButton,
  save: indigoButton,
  focus: indigoButton,
  subtask:
    base +
    ' w-full text-left text-slate-400 border-dashed border-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-all',
  optiontrue: base + ' border-2 justify-center border-black',
  optionfalse: base + ` border-2 justify-center text-slate-400`,
  cancel:
    base + ' border justify-center bg-slate-100 border-slate-300 hover:bg-slate-200 active:bg-slate-300 text-slate-500',
  edit:
    base +
    ' w-full border justify-center bg-slate-100 border-slate-300 hover:bg-slate-200 active:bg-slate-300 text-slate-500',
};

type PropsType = {
  type?: 'button' | 'reset' | 'submit' | undefined;
  name: string;
  children: ReactNode;
  handler?: any;
  disabled?: boolean;
  conditionStyle?: string;
};

const Button = ({ name, children, handler, disabled = false, conditionStyle = '', type = 'button' }: PropsType) => {
  const style = twMerge(styles[name], conditionStyle);
  return (
    <button type={type} onClick={handler} disabled={disabled} className={style}>
      {children}
    </button>
  );
};

export default Button;
