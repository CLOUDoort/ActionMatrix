import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ucFirst } from '../utils/ucFirst';

type PropsType = {
  children: ReactNode;
  to: string;
  section: string;
  type: string;
  handler: () => void;
};

const AppNavLink = ({ children, to, handler, section, type }: PropsType) => {
  return (
    <Link
      to={to}
      onClick={handler}
      className={`flex items-center px-3 py-2 rounded gap-2 ${section === type ? 'bg-slate-200' : ''}`}
    >
      {children}
      <span>{ucFirst(type)}</span>
    </Link>
  );
};

export default AppNavLink;
