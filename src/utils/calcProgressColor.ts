export const calcProgressColor = (value: number) => {
  if (value < 34) return 'bg-red-400';
  if (value < 67) return 'bg-yellow-400';
  if (value < 100) return 'bg-green-400';
  return 'bg-Indigo';
};
