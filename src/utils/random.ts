export const generateRandomValue = (min:number, max: number, numAfterDigit = 0): number =>
  Number.parseInt(((Math.random() * (max - min)) + min).toFixed(numAfterDigit), 10);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length - 1)];
