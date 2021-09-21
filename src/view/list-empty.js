import AbstractView from './abstract';
import {FilterBy} from '../const';

const NoTasksTextType = {
  [FilterBy.EVERYTHING]: 'Click New Event to create your first point',
  [FilterBy.FUTURE]: 'There are no future events now',
  [FilterBy.PAST]: 'There are no past events now',
};

const listEmptyContainer = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
};

export default class ListEmpty extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return listEmptyContainer(this._data);
  }
}
