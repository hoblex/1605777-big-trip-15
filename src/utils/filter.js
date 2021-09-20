import {FilterBy} from '../const';
import dayjs from 'dayjs';

export const filter = {
  [FilterBy.EVERYTHING]: (points) => points,
  [FilterBy.FUTURE]: (points) => points.filter((point) => dayjs(point.time.timeBegin).diff(dayjs(new Date())) >= 0),
  [FilterBy.PAST]: (points) => points.filter((point) => dayjs(point.time.timeBegin).diff(dayjs(new Date())) <= 0),
};
