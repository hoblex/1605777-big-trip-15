import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
//expect(()=>getRandomInteger(0.49,0.51)).toThrow();

const generateRandomItem = (list = []) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};
//expect(()=>generateRandomItem()).toThrow();

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

const DESCRIPTION_PHRASES = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const PHOTO_ALIAS = 'http://picsum.photos/248/152?r=';

const generateDescriptionPhrases = (phrases) => {
  const phrasesList = phrases.split('. ');
  return (new Array(getRandomInteger(1, 5)).fill().map(() => phrasesList.splice(getRandomInteger(0, phrasesList.length - 1), 1))).join('. ');
};

const generateAdditionalOption = (options, pointType) => {
  const optionsList = new Map(options);
  if (optionsList.has(pointType)) {
    return optionsList.get(pointType).map((item) => {
      const newItem = new Array(item);
      newItem.push(getRandomInteger(1, 100));
      newItem.push(Boolean(getRandomInteger(0, 1)));
      return newItem;
    });
  } else {
    return null;
  }
};

const countAdditionalOptionsCost = (optionsList) => {
  if (optionsList !== null) {
    let optionsCost = 0;
    for (let i = 0; i < optionsList.length; i++) {
      optionsCost += optionsList[i][1];
    }
    return optionsCost;
  } else {
    return 0;
  }
};

const generateDate = () => {
  const maxDaysGap = 1;
  const date1 = dayjs().add(getRandomInteger(-maxDaysGap, maxDaysGap), 'day');
  const date2 = dayjs().add(getRandomInteger(-maxDaysGap, maxDaysGap), 'day');
  if (dayjs(date2).diff(date1,'day') >= 0) {
    return {
      'dateBegin': date1,
      'dateEnd': date2,
    };
  } else {
    return {
      'dateBegin': date2,
      'dateEnd': date1,
    };
  }
};

const generateTimeDuration = (day) => {
  const maxMinGap = 180;
  const time1 = dayjs(day).add(getRandomInteger(-maxMinGap, maxMinGap), 'minute');
  const time2 = dayjs(day).add(getRandomInteger(-maxMinGap, maxMinGap), 'minute');

  if (dayjs(`${time2}`).diff(dayjs(`${time1}`,'minute')) >= 0) {
    return {
      'timeBegin': time1,
      'timeEnd': time2,
      //https://day.js.org/docs/en/plugin/duration
      'timeDuration': dayjs.utc(dayjs(`${time2}`).diff(dayjs.utc(`${time1}`, 'minute'))),
    };
  } else {
    return {
      'timeBegin': time2,
      'timeEnd': time1,
      //https://day.js.org/docs/en/plugin/duration
      'timeDuration': dayjs.utc(dayjs(`${time1}`).diff(dayjs.utc(`${time2}`, 'minute'))),
    };
  }
};

const generatePhotoList = () => new Array(getRandomInteger(1, 6)).fill().map(() => PHOTO_ALIAS + getRandomInteger(1, 100));

export const generatePoint = () => {
  const date = generateDate();
  const time = generateTimeDuration(date.dateBegin);
  const pointType = generateRandomItem(TYPES);
  const additionalOptions = generateAdditionalOption(ADDITIONAL_OPTIONALS, pointType);
  const pointCost = getRandomInteger(1, 10) * 10;
  const fullPointCost = countAdditionalOptionsCost(additionalOptions) + pointCost;
  return {

    pointType,
    city: generateRandomItem(CITIES),
    time,
    additionalOptions,
    pointCost,
    fullPointCost,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    description: generateDescriptionPhrases(DESCRIPTION_PHRASES),
    photoList: generatePhotoList(),
  };
};
