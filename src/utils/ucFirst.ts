export const ucFirst = (word: string) => {
  const lower = word.toLowerCase();
  return lower[0].toUpperCase() + lower.slice(1);
};
