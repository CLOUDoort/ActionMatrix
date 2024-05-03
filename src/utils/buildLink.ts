import { Location, useLocation } from 'react-router-dom';

import { clearLink } from './clearLink';
import queryString from 'query-string';

interface BuildLinkInterface {
  priority?: string;
  difficulty?: string;
}

export const buildLink = (nxtPriority?: string, nxtDifficulty?: string) => {
  const location: Location = useLocation();
  const curParams = queryString.parse(location.search);

  // 현재 url의 priority와 difficulty
  const curPriority = curParams.priority as string | undefined;
  const curDifficulty = curParams.difficulty as string | undefined;

  // 다음 url로 설정할 params
  const params: BuildLinkInterface = {};
  const priority = clearLink(curPriority, nxtPriority);
  const difficulty = clearLink(curDifficulty, nxtDifficulty);
  if (priority) params.priority = priority;
  if (difficulty) params.difficulty = difficulty;

  const query = queryString.stringify(params, { sort: false });
  const basePath = location.pathname;

  return query ? `${basePath}?${query}` : basePath;
};
