import AbstractView from './abstract';
import {MenuItem} from '../const';

const className = (page, current) => page === current ? 'trip-tabs__btn--active' : '';

const pageItem = (page, current) => (
  `<a class="trip-tabs__btn  ${className(page,current)}" href="#">${page}</a>`
);

const createMenuTemplateView = (current = MenuItem.TABLE) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${pageItem(MenuItem.TABLE,current)}
  ${pageItem(MenuItem.STATS,current)}
   </nav>`
);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._current = MenuItem.TABLE;
  }

  getTemplate() {
    return createMenuTemplateView(this._current);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector('.trip-tabs__btn').addEventListener('click', this._menuClickHandler);
  }
}
