import { useState } from 'react';
import AppNavList from './AppNavList';
import NavIcon from './NavIcon';

export const normalLink =
  'flex items-center px-3 py-2 rounded gap-2 hover:bg-slate-200 active:bg-slate-300 transition-all';
export const activeLink = normalLink + ' bg-slate-200';

const baseNavStyle = 'gap-4 px-6 py-10 border-r border-slate-200 bg-slate-50 h-full';

const AppNav = () => {
  const [navState, setNavState] = useState<{ [key: string]: boolean }>({
    sm: false,
    lg: true,
  });
  const { sm, lg } = navState;
  const handleNavState = (key: string) => {
    setNavState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* 1024px 이상에서 nav 조작 */}
      {lg ? (
        <aside className={`hidden lg:block min-w-56 ${baseNavStyle} `}>
          <AppNavList handler={() => handleNavState('lg')} />
        </aside>
      ) : (
        <NavIcon handler={() => handleNavState('lg')} type="lg" />
      )}

      {/* 1024px 미만에서 nav 조작 */}
      {sm && (
        <div className="absolute inset-0 z-50 bg-black/20" onClick={() => handleNavState('sm')}>
          <aside onClick={(e) => e.stopPropagation()} className={`w-60 ${baseNavStyle}`}>
            <AppNavList handler={() => handleNavState('sm')} />
          </aside>
        </div>
      )}
      <NavIcon handler={() => handleNavState('sm')} type="sm" />
    </>
  );
};

export default AppNav;
