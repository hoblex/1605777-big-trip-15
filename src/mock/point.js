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
    'Sightseeing',
    'Restaurant',
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

const generateAdditionalOption = (pointType) => {
  const additionalOptions = new Map();
  additionalOptions.set('Taxi', [ 'Order Uber' ]);
  additionalOptions.set('Flight', ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train']);
  additionalOptions.set('CheckIn', ['Add breakfast']);
  additionalOptions.set('Sightseeing', ['Book tickets', 'Lunch in city']);

  // const randomIndex = getRandomInteger(0, city.length - 1);
  //
  console.log(pointType);
  if (additionalOptions.has(pointType)) {
    return additionalOptions.get(pointType);
  } else {
    return null;
  }
};

console.log(generateAdditionalOption(generatePointType()));

const generatePoint = () => ({
  type: generatePointType(),
  city: generateCity(),
  additionalOptions: generateAdditionalOption(generatePointType()),
});

console.log(generatePoint());
