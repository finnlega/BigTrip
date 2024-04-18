
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

// Найдем по ключу значение обьекта

export const findByKeyValue = (array, key, value) => {
  const matching = array.find((item) => item[key] === value);
  return matching;
};

export const transformTime = (time) => {
  // debugger;
  const days = Math.floor(time / 1440);
  const remainingMinutes = time % 1440;
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  // Форматируем результат в зависимости от условий

  if (days === 0) {
    if (hours === 0) {
      if (minutes < 10) {
        return `0${minutes}M`;
      }
      return `${minutes}M`;
    } else {
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}H ${formattedMinutes}M`;
    }
  } else {
    const formattedDays = days < 10 ? `0${days}` : days;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (hours === 0 && minutes === 0) {
      return `${formattedDays}D`;
    } else {
      return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
    }
  }
};

export const sortValues = (array) => {
  const entries = Object.entries(array);
  entries.sort((a, b) => b[1] - a[1]);
  return Object.fromEntries(entries);
};

export const restoreCssClass = (cssClass) => {
  const rules = document.styleSheets[0].cssRules;
  let ruleIndex;
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].selectorText === cssClass) {
      ruleIndex = i;
      break;
    }
  }
  if (ruleIndex !== undefined) {
    document.styleSheets[0].deleteRule(ruleIndex);
  }
};
