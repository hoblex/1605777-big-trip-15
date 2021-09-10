export const RenderPosition = {
  BEFORE_END: 'beforeend',
  AFTER_BEGIN: 'afterbegin',
};

export const render = (container, element, place = RenderPosition.BEFORE_END) => {
  switch (place) {
    case RenderPosition.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE_END:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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
