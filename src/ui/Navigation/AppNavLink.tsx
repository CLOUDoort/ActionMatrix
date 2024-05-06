import { NavLink, useSearchParams } from 'react-router-dom';

import { ucFirst } from '../../utils/ucFirst';
import { activeLink, normalLink } from './AppNavList';

type PropsType = {
  to: string;
  section: string;
  value: string;
};

const AppNavLink = ({ to, section, value }: PropsType) => {
  const [searchParams] = useSearchParams();
  const isActiveParams = searchParams.get(section) === value;
  const name = ucFirst(value);

  return (
    <NavLink to={to} end className={isActiveParams ? activeLink : normalLink}>
      <img src={`/${name}.svg`} alt={value} className="size-6" />
      <span>{name}</span>
    </NavLink>
  );
};

export default AppNavLink;
