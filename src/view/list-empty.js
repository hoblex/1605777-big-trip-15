import AbstractView from './abstract';
import {FilterBy} from '../const';

const NoPointsTextType = {
  [FilterBy.EVERYTHING]: 'Click New Event to create your first point',
  [FilterBy.FUTURE]: 'There are no future events now',
  [FilterBy.PAST]: 'There are no past events now',
};

const listEmptyContainer = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];

  return `<p class="trip-events__msg">${noPointTextValue}</p>`;
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
