import { HiOutlineBars3 } from 'react-icons/hi2';

const base = 'p-1.5 rounded cursor-pointer hover:bg-slate-200 my-10 ml-5';
const styles: { [key: string]: string } = {
  sm: base + ' min-w-9 lg:hidden',
  lg: base + ' hidden lg:block',
};

const NavIcon = ({ handler, type }: { handler: () => void; type: string }) => {
  return <HiOutlineBars3 onClick={handler} size={35} className={`${styles[type]}`} />;
};

export default NavIcon;
