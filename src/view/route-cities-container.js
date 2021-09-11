import {createElement} from './utils';

const createRouteCitiesContainer = () => (
  `<section class="trip-main__trip-info  trip-info">
  </section>`
);

export default class RouteCitiesContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRouteCitiesContainer();
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
