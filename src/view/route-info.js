import dayjs from 'dayjs';
import AbstractView from './abstract';

const BEGINNING_FORMAT_STRING ='MMM DD';
const END_FORMAT_SAME_MONTH = 'DD';
const END_FORMAT_OTHER_MONTH ='MMM DD';

export const createTripInfo = (cityList, dateList, price) => {
  const arr = Array.from(dateList);
  const [tripBegin] = arr[0];
  const [, tripEnd] = arr[arr.length - 1];
  const tripDateBeginEnd = dayjs(tripBegin).diff(tripEnd, 'month') === 0
    ? `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_SAME_MONTH)}`
    : `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_OTHER_MONTH)}`;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${Array.from(cityList).join(' &mdash; ')}</h1>
    <p class="trip-info__dates">${tripDateBeginEnd}</p>
    </div>
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
   </p>
    </section>`;
};

export default class RouteInfo extends AbstractView {
  constructor(cityList, dateList, price) {
    super();
    this._cityList = cityList;
    this._dateList = dateList;
    this._price = price;
  }

  getTemplate() {
    return createTripInfo(this._cityList, this._dateList, this._price);
  }
}
