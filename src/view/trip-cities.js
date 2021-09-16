import dayjs from 'dayjs';
import AbstractView from './abstract';

const BEGINNING_FORMAT_STRING ='MMM DD';
const END_FORMAT_SAME_MONTH = 'DD';
const END_FORMAT_OTHER_MONTH ='MMM DD';

export const createTripInfoCities = (cityList, dateList) => {
  const arr = Array.from(dateList);
  const [tripBegin] = arr[0];
  const [, tripEnd] = arr[arr.length - 1];
  const tripDateBeginEnd = dayjs(tripBegin).diff(tripEnd, 'month') === 0
    ? `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_SAME_MONTH)}`
    : `${dayjs(tripBegin).format(BEGINNING_FORMAT_STRING)}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format(END_FORMAT_OTHER_MONTH)}`;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${Array.from(cityList).join(' &mdash; ')}</h1>
    <p class="trip-info__dates">${tripDateBeginEnd}</p>
    </div>`;
};

export default class TripCities extends AbstractView {
  constructor(cityList, dateList) {
    super();
    this._cityList = cityList;
    this._dateList = dateList;
  }

  getTemplate() {
    return createTripInfoCities(this._cityList, this._dateList);
  }
}
