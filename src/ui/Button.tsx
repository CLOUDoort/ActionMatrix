import { ReactNode } from 'react';

const base = 'flex items-center gap-2 px-3 text-base py-2 min-w-[5rem] rounded transition-all';
const indigoButton = base + ' text-white justify-center bg-Indigo hover:bg-IndigoHover active:bg-IndigoActive';

const styles: { [key: string]: string } = {
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
  children: ReactNode;
  type: string;
  handler?: any;
  disabled?: boolean;
  submit?: boolean;
  conditionStyle?: string;
};

const Button = ({ children, type, handler, disabled = false, submit = false, conditionStyle = '' }: PropsType) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={handler}
      disabled={disabled}
      className={`${styles[type]} ${conditionStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
