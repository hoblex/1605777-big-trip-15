import {createElement} from './utils';

const Pages = {
  TABLE: 'Table',
  STATS: 'Stats',
};

const className = (page, current) => page === current ? 'trip-tabs__btn--active' : '';

const pageItem = (page, current) => (
  `<a class="trip-tabs__btn  ${className(page,current)}" href="#">${page}</a>`
);

const createMenuTemplateView = (current = Pages.TABLE) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${pageItem(Pages.TABLE,current)}
  ${pageItem(Pages.STATS,current)}
   </nav>`
);

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplateView();
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
