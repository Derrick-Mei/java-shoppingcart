export const generateRandomNumByRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
