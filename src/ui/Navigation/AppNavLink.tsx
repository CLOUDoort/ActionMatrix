import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { ucFirst } from '../../utils/ucFirst';
import { activeLink, normalLink } from './AppNavList';

type PropsType = {
  to: string;
  section: string;
  value: string;
};

const checkUrl = (url: string) => {
  const pattern = /create|update/;
  return pattern.test(url);
};

const AppNavLink = ({ to, section, value }: PropsType) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isForm = checkUrl(location.pathname);
  const isActiveParams = searchParams.get(section) === value;
  const name = ucFirst(value);

  return (
    <NavLink
      to={to}
      end
      className={`${isForm && 'pointer-events-none opacity-50'} ${isActiveParams ? activeLink : normalLink}`}
    >
      <img src={`/${name}.svg`} alt={value} className="size-6" />
      <span>{name}</span>
    </NavLink>
  );
};

export default AppNavLink;
