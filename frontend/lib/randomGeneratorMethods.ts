const generateRandomNumByRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const chooseRandomItemInArray = (arr: [any]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  return randomItem;
};

export {generateRandomNumByRange, chooseRandomItemInArray};
