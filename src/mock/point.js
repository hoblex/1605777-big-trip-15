const dayjs = require('dayjs');

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomItem = (list = []) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};

const ADDITIONAL_OPTIONALS = [
  ['Taxi', [ 'Order Uber' ]],
  ['Flight', ['Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train']],
  ['CheckIn', ['Add breakfast']],
  ['Sightseeing', ['Book tickets', 'Lunch in city']],
];

const TYPES = [
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

const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
];

const DESCRIPTION_PHRASE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateDescription = (phrases) => {
  const phrasesList = phrases.split('. ');
  const descriptionList = new Array(getRandomInteger(1, 5)).fill().map(() => phrasesList.splice(getRandomInteger(0, phrasesList.length - 1), 1));
  return descriptionList;
};

const generateAdditionalOption = (options, pointType) => {
  const optionsList = new Map(options);
  if (optionsList.has(pointType)) {
    return optionsList.get(pointType).map((item) => {
      const newItem = new Array(item);
      newItem.push(getRandomInteger(1, 100));
      return newItem;
    });
  } else {
    return null;
  }
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').format('DD/MM/YYYY');
};

const generatePoint = () => {
  const date = generateDate();
  const pointType = generateRandomItem(TYPES);
  return {
    pointType,
    city: generateRandomItem(CITIES),
    additionalOptions: generateAdditionalOption(ADDITIONAL_OPTIONALS, pointType),
    date,
    description: generateDescription(DESCRIPTION_PHRASE),
  };
};

console.log(generatePoint());
