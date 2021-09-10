import {createElement} from './utils';

const createPointItemContainer = () => (
  `<li class="trip-events__item">
  </li>`
);

export default class TripPointItemContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPointItemContainer();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
