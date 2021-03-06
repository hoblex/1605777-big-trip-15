import dayjs from 'dayjs';

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
  INIT: 'INIT',
};

export const FilterBy = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const BLANK_POINT = {
  pointType: 'taxi',
  city: '',
  time: {timeBegin: dayjs(), timeEnd:dayjs(), timeDuration:null},
  additionalOptions: [],
  pointCost: 0,
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  isFavorite: false,
};

export const TableStatsItems = {
  TABLE: 'Table',
  STATS: 'Stats',
};


export const Type = {
  TAXI: 'Taxi',
  BUS:'Bus',
  TRAIN:'Train',
  SHIP:'Ship',
  DRIVE:'Drive',
  FLIGHT:'Flight',
  CHECK_IN:'Check-in',
  SIGHTSEEING:'Sightseeing',
  RESTAURANT:'Restaurant',
};

export const FORM_TYPES = Object.values(Type);
