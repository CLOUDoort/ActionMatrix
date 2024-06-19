export const handleError = (error: any | null, message: string): void => {
  if (error) throw new Error(`${message}: ${error.message}`);
};
