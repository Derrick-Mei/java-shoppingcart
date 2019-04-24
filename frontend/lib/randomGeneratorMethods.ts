const generateRandomNumByRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

function chooseRandomItemInArray<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  return randomItem;
}

export {generateRandomNumByRange, chooseRandomItemInArray};
