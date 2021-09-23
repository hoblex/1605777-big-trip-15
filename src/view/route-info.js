import dayjs from 'dayjs';
import AbstractView from './abstract';

const BEGINNING_FORMAT_STRING ='MMM DD';
const END_FORMAT_SAME_MONTH = 'DD';
const END_FORMAT_OTHER_MONTH ='MMM DD';

const createDateInfo = (dateList) => {
  const dateArray = Array.from(dateList);
  const [tripBegin] = dateArray[0];
  const [, tripEnd] = dateArray[dateArray.length - 1];
  const tripDateBeginEnd = tripBegin.month() === tripEnd.month()
    ? `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_SAME_MONTH)}`
    : `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_OTHER_MONTH)}`;

  return tripDateBeginEnd;
};

const createCityList = (cityList) => {
  const cityArray = Array.from(cityList);
  return [cityArray[0], '...', cityArray[cityArray.length - 1]].join(' &mdash; ');

};

export const createTripInfo = (cityList, dateList, price) => {

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${createCityList(cityList)}</h1>
    <p class="trip-info__dates">${createDateInfo(dateList)}</p>
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
