import {createElement} from './utils';

const FilterBy = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

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

export default class Filter {
  constructor(current) {
    this._current = current;
    this._element = null;
  }

  getTemplate() {
    return createFilters(this._current);
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
