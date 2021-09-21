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
  constructor(menuCurrent) {
    super();
    this._menuCurrent = menuCurrent;
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplateView(this._menuCurrent);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(MenuItem.STATS);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelectorAll('.trip-tabs__btn').forEach((item) => item.addEventListener('click', this._menuClickHandler));
  }
}
