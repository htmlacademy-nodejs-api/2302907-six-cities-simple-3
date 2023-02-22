export type Cities = Record<string, [number,number]>;

export const CITIES: Cities = {
  'Paris': [48.85661, 2.351499],
  'Cologne': [50.938361, 6.959974],
  'Brussels': [50.846557, 4.351697],
  'Amsterdam': [52.370216, 4.895168],
  'Hamburg': [53.550341, 10.000654],
  'Dusseldorf': [51.225402, 6.776314],
};

export const CITY_RESTRICTIONS = {
  name: {
    message: 'Поле name должно быть строкой',
  },
  location: {
    length: 2,
    message: 'Поле location должно быть массивом чисел из 2 элементов [lat, long]',
  }
} as const;
