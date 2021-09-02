// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePointType = () => {
  const types = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseen',
    'Restaraunt',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateCity = () => {
  const city = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
  ];

  const randomIndex = getRandomInteger(0, city.length - 1);

  return city[randomIndex];
};

const generateAdditionalOption = () => {
  const optionType = [
    'Amsterdam',
    'Chamonix',
    'Geneva',
  ];

  const randomIndex = getRandomInteger(0, city.length - 1);

  return city[randomIndex];
};

export const generatePoint = () => ({
  type: generatePointType(),
  city: generateCity(),
});

console.log(generatePoint());
