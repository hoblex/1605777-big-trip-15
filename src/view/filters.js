import AbstractView from './abstract';
import {FilterBy} from '../const';

const checked = (value, current) => value === current ? 'checked' : '';

const filterItem = (value, current) => (
  `<div class="trip-filters__filter">
  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${checked(value,current)}>
  <label class="trip-filters__filter-label" for="filter-everything">${value}</label>
</div>`
);

const createFilters = (current=FilterBy.EVERYTHING) => (
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
  }

  getTemplate() {
    return createFilters(this._current);
  }
}
