// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  if(!(Number.isInteger(a) && Number.isInteger(b))) {
    throw new Error ('Integer numbers expected');
  } else {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    return Math.floor(lower + Math.random() * (upper - lower + 1));
  }
};

export const generateRandomItem = (list = []) => {
  if (list.length === 0) {
    throw new Error ('Integer numbers expected');
  } else {
    const randomIndex = getRandomInteger(0, list.length - 1);
    return list[randomIndex];
  }
};
