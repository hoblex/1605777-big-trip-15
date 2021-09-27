import dayjs from 'dayjs';
import AbstractView from './abstract';
import {sortDatePointUp} from '../utils/point';

const BEGINNING_FORMAT_STRING ='MMM DD';
const END_FORMAT_SAME_MONTH = 'DD';
const END_FORMAT_OTHER_MONTH ='MMM DD';

const createDateInfo = (pointsList) => {
  const dateHolder = Array.from(pointsList).sort(sortDatePointUp);
  const tripBegin = dateHolder[0].time.timeBegin;
  const tripEnd = dateHolder[dateHolder.length - 1].time.timeEnd;
  const tripDateBeginEnd = tripBegin.month() === tripEnd.month()
    ? `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_SAME_MONTH)}`
    : `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_OTHER_MONTH)}`;

  return tripDateBeginEnd;
};

const createCityList = (pointsList) => {
  const cityList = Array.from(pointsList).sort(sortDatePointUp);
  return [cityList[0].city, '...', cityList[cityList.length - 1].city].join(' &mdash; ');

};

export const createTripInfo = (points, price) => (`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    <h1 class="trip-info__title">${createCityList(points)}</h1>
    <p class="trip-info__dates">${createDateInfo(points)}</p>
    </div>
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
   </p>
    </section>`);

export default class RouteInfo extends AbstractView {
  constructor(points, price) {
    super();
    this._cityList = points;
    this._price = price;
  }

  getTemplate() {
    return createTripInfo(this._cityList, this._price);
  }
}
