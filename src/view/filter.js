import AbstractView from './abstract';
import {FilterBy} from '../const';

const checked = (value, current) => value === current ? 'checked' : '';

const filterItem = (value, current) => (
  `<div class="trip-filters__filter">
  <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${checked(value,current)}>
  <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
</div>`
);

const createFilterTemplate = (current=FilterBy.EVERYTHING) => (
  `<form class="trip-filters" action="#" method="get">
   ${filterItem(FilterBy.EVERYTHING, current)}
  ${filterItem(FilterBy.FUTURE, current)}
  ${filterItem(FilterBy.PAST, current)}
      <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`
);

export default class Filter extends AbstractView {
  constructor(current) {
    super();
    this._current = current;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._current);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('input', this._filterTypeChangeHandler);
  }
}
