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
export const createFilters = (current=FilterBy.EVERYTHING) => (
  `<form class="trip-filters" action="#" method="get">
  ${filterItem(FilterBy.EVERYTHING, current)}
  ${filterItem(FilterBy.FUTURE, current)}
  ${filterItem(FilterBy.PAST, current)}
      <button class="visually-hidden" type="submit">Accept filter</button>
   </form>`
);
