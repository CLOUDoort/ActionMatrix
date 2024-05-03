export const clearLink = (cur?: string, nxt?: string) => {
  /**
   * 현재 선택한 cur link와 다음에 선택할 nxt link 존재
   * nxt link가 undefined라면 무조건 이전의 cur link로 유지
   * 그렇지 않다면 cur link는 nxt link로 이동
   */
  if (nxt === undefined) return cur;
  return cur === nxt ? '' : nxt;
};
