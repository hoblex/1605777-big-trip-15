import dayjs from "dayjs";

export const SortType = {
  DAY: 'sort-day',
  EVENT: 'sort-event',
  TIME: 'sort-time',
  PRICE: 'sort-price',
  OFFER: 'sort-offer',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterBy = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const BLANK_POINT = {
  pointType: 'Taxi',
  city: '',
  time: {timeBegin: dayjs(), timeEnd:dayjs(), timeDuration:null},
  additionalOptions: new Map(),
  pointCost: 0,
  photoList: new Array(0),
  description: new Map(),
};
