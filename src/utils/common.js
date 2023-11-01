// Вернет случайное число

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(lower + Math.random() * (upper - lower + 1));
  return result;
};

// Вернет элемент из массива случайным образом

export const getElementFromArray = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

export const shuffleArray = (currentArray) => {
  const array = currentArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    const initialElement = array[array.length-1];  // замену будем делать через дополнительную переменную
    array[array.length-1] = array[j];
    array[j] = initialElement;
  }
  const randomIndex = getRandomInteger(0, array.length - 1);
  const item = array[randomIndex];
  return item;
};

// Копирует массив

export const dataCopy = (array) => {
  const data = array.slice();
  return data;
};

// Работа со строкой

export const replaceString = (string) => {
  const index = string.lastIndexOf(' ');
  return string.slice(index + 1);
};

// Найдем по ключу обьект

export const сompareType = (array, key) => {
  const matching = array.find((item) => item.type === key);
  return matching;
};
