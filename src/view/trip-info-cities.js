import dayjs from 'dayjs';

export const createTripInfoCities = (cityList, dateList) => {
  const arr = Array.from(dateList);
  const [tripBegin] = arr[0];
  const [, tripEnd] = arr[arr.length - 1];
  const tripDateBeginEnd = dayjs(tripBegin).diff(tripEnd, 'month') === 0
    ? `${dayjs(tripBegin).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format('DD')}`
    : `${dayjs(tripBegin).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(tripEnd).format('MMM DD')}`;

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${Array.from(cityList).join(' &mdash; ')}</h1>
    <p class="trip-info__dates">${tripDateBeginEnd}</p>
    </div>`;
};
