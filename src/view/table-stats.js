import AbstractView from './abstract';
import {TableStatsItems} from '../const';

const className = (page, current) => page === current ? 'trip-tabs__btn--active' : '';

const pageItem = (page, current) => (
  `<a class="trip-tabs__btn  ${className(page,current)}" href="#">${page}</a>`
);

const createTableStatsTemplateView = (current = TableStatsItems.TABLE) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${pageItem(TableStatsItems.TABLE,current)}
  ${pageItem(TableStatsItems.STATS,current)}
   </nav>`
);

export default class TableStats extends AbstractView {
  constructor(tableStatsCurrent) {
    super();
    this._tableStatsCurrent = tableStatsCurrent;
    this._tableStatsClickTableHandler = this._tableStatsClickTableHandler.bind(this);
    this._tableStatsClickStatsHandler = this._tableStatsClickStatsHandler.bind(this);
  }

  getTemplate() {
    return createTableStatsTemplateView(this._tableStatsCurrent);
  }

  _tableStatsClickTableHandler(evt) {
    if(this._tableStatsCurrent !== TableStatsItems.TABLE) {
      evt.preventDefault();
      this._callback.tableStatsClick(TableStatsItems.TABLE);
    }
  }

  _tableStatsClickStatsHandler(evt) {
    if(this._tableStatsCurrent !== TableStatsItems.STATS) {
      evt.preventDefault();
      this._callback.tableStatsClick(TableStatsItems.STATS);
    }
  }

  setTableStatsClickHandler(callback) {
    this._callback.tableStatsClick = callback;
    this.getElement().querySelector('.trip-tabs :first-child').addEventListener('click', this._tableStatsClickTableHandler);
    this.getElement().querySelector('.trip-tabs :last-child').addEventListener('click', this._tableStatsClickStatsHandler);
  }
}
