import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
  type: string;
  handler?: any;
  disabled?: boolean;
  submit?: boolean;
  additionalStyle?: string;
};

const base = 'flex items-center gap-2 px-3 text-base py-2 min-w-[5rem] rounded transition-all';
const indigoButton = base + ' text-white justify-center bg-Indigo hover:bg-IndigoHover active:bg-IndigoActive';

const styles: { [key: string]: string } = {
  create: indigoButton,
  save: indigoButton,
  subtask:
    base +
    ' w-full text-left text-slate-400 border-dashed border-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 transition-all',
  optiontrue: base + ' border-2 justify-center border-black',
  optionfalse: base + ` border-2 justify-center border-slate-200 text-slate-400`,
  cancel: base + ' border justify-center border-slate-200',
};

const Button = ({ children, type, handler, disabled = false, submit = false, additionalStyle = '' }: PropsType) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={handler}
      disabled={disabled}
      className={`${styles[type]} ${additionalStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
