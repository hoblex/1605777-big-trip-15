import AbstractView from './abstract';

const OrderBy = {
  day: {
    value: 'sort-day',
    modifier: 'trip-sort__item--day',
    label: 'Day',
    disabled: false,
  },
  event: {
    value: 'sort-event',
    modifier: 'trip-sort__item--event',
    label: 'Event',
    disabled: true,
  },
  time: {
    value: 'sort-time',
    modifier: 'trip-sort__item--time',
    label: 'Time',
    disabled: false,
  },
  price: {
    value: 'sort-price',
    modifier: 'trip-sort__item--price',
    label: 'Price',
    disabled: false,
  },
  offer: {
    value: 'sort-offer',
    modifier: 'trip-sort__item--offer',
    label: 'Offers',
    disabled: true,
  },
};

const xchecked = (value, current)=>value===current?'checked':'';
const xdisabled = (value)=>value?'disabled':'';

const sortItem = ({value, modifier, label, disabled}, current)=>(`<div class="trip-sort__item  ${modifier}">
<input id="${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${xchecked(value,current)} ${xdisabled(disabled)}>
<label class="trip-sort__btn" for="${value}">${label}</label>
</div>`);

const createSort = (current=OrderBy.day.value) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortItem(OrderBy.day,current)}
  ${sortItem(OrderBy.event, current)}
  ${sortItem(OrderBy.time, current)}
  ${sortItem(OrderBy.price, current)}
  ${sortItem(OrderBy.offer, current)}
  </form>`
);

export default class Sort extends AbstractView {
  constructor(order) {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._order = order;
  }

  getTemplate() {
    return createSort(this._order);
  }

  _sortTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
