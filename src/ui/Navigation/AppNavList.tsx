import { HiOutlineBars3, HiOutlineDocument, HiOutlineDocumentCheck } from 'react-icons/hi2';
import AppNavItem from './AppNavItem';
import { NavLink } from 'react-router-dom';
import AppNavLink from './AppNavLink';
import { Difficulty, Priority } from '../../constants/constants';
import { buildLink } from '../../utils/buildLink';

export const normalLink =
  'flex items-center px-3 py-2 rounded gap-2 hover:bg-slate-200 active:bg-slate-300 transition-all';
export const activeLink = normalLink + ' bg-slate-200';

const AppNavList = ({ handler }: { handler: () => void }) => {
  return (
    <ul className="flex flex-col gap-4">
      {/* Logo */}
      <li className="flex items-center justify-between">
        <span className="flex items-center justify-center gap-2">
          <img src="/Logo.png" alt="Logo" className="size-6" />
          <p className="text-base">ActionMatrix</p>
        </span>
        <HiOutlineBars3 onClick={handler} size={35} className="p-1.5 rounded cursor-pointer hover:bg-slate-200" />
      </li>

      {/* Tasks */}
      <AppNavItem name="Tasks">
        <NavLink to="/app/todo" end className={({ isActive }) => (isActive ? activeLink : normalLink)}>
          <HiOutlineDocument size={24} />
          <span>Todo</span>
        </NavLink>
        <NavLink to="/app/done" end className={({ isActive }) => (isActive ? activeLink : normalLink)}>
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
    </ul>
  );
};

export default AppNavList;
