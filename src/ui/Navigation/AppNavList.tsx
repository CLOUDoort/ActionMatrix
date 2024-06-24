import { Difficulty, Priority } from '../../constants/filter';
import { HiOutlineBars3, HiOutlineDocument, HiOutlineDocumentCheck } from 'react-icons/hi2';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import AppNavItem from './AppNavItem';
import AppNavLink from './AppNavLink';
import { buildLink } from '../../utils/buildLink';
import { googleLogout } from '@/authentication/googleLogout';
import { useAuthContext } from '@/authentication/AuthContext';
import { HiOutlineUserCircle } from 'react-icons/hi2';

export const normalLink =
  'flex items-center px-3 py-2 rounded gap-2 hover:bg-slate-200 active:bg-slate-300 transition-all';
export const activeLink = normalLink + ' bg-slate-200';

const AppNavList = ({ handler }: { handler: () => void }) => {
  const navigate = useNavigate();
  const {
    auth: {
      user: { avatarUrl, name },
      version,
    },
  } = useAuthContext();

  const handleLogout = () => {
    googleLogout();
    navigate('/', { replace: true });
  };

  return (
    <ul className="flex flex-col justify-between gap-4">
      <div className="flex flex-col gap-4">
        {/* Logo */}
        <li className="flex items-center justify-between">
          <Link to="/" className="flex items-center justify-center gap-2">
            <img src="/Logo.png" alt="Logo" className="size-6" />
            <p className="text-base">ActionMatrix</p>
          </Link>
          <HiOutlineBars3 onClick={handler} size={35} className="p-1.5 rounded cursor-pointer hover:bg-slate-200" />
        </li>

        {/* Tasks */}
        <AppNavItem name="Tasks">
          <NavLink to={`/${version}/task/todo`} end className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <HiOutlineDocument size={24} />
            <span>Todo</span>
          </NavLink>
          <NavLink to={`/${version}/task/done`} end className={({ isActive }) => (isActive ? activeLink : normalLink)}>
            <HiOutlineDocumentCheck size={24} />
            <span>Done</span>
          </NavLink>
        </AppNavItem>

        {/* Priority */}
        <AppNavItem name="Priority">
          <AppNavLink to={buildLink(Priority.high)} section={'priority'} value={Priority.high} />
          <AppNavLink to={buildLink(Priority.medium)} section={'priority'} value={Priority.medium} />
          <AppNavLink to={buildLink(Priority.low)} section={'priority'} value={Priority.low} />
        </AppNavItem>

        {/* Difficulty */}
        <AppNavItem name="Difficulty">
          <AppNavLink to={buildLink(undefined, Difficulty.hard)} section={'difficulty'} value={Difficulty.hard} />
          <AppNavLink to={buildLink(undefined, Difficulty.normal)} section={'difficulty'} value={Difficulty.normal} />
          <AppNavLink to={buildLink(undefined, Difficulty.easy)} section={'difficulty'} value={Difficulty.easy} />
        </AppNavItem>
      </div>

      {/* User */}
      <li className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-[50%] w-6 h-6 relative overflow-hidden">
            {version === 'demo' ? (
              <HiOutlineUserCircle size={24} />
            ) : avatarUrl ? (
              <img src={avatarUrl} alt="avatar" />
            ) : (
              <HiOutlineUserCircle size={24} />
            )}
          </div>
          <span className="text-sm">{name ? name : 'loading'}</span>
        </div>
        {version !== 'demo' && (
          <button
            onClick={handleLogout}
            className="px-3 py-2 text-xs transition-colors border rounded border-slate-500 text-slate-600 hover:bg-black/5 active:bg-black/10"
          >
            logout
          </button>
        )}
      </li>
    </ul>
  );
};

export default AppNavList;
