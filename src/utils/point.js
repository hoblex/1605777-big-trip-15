import dayjs from 'dayjs';

export const sortDatePointUp = (pointA, pointB) => dayjs(pointA.time.timeBegin).diff(dayjs(pointB.time.timeBegin));

export const sortDatePointDown = (pointA, pointB) => dayjs(pointB.time.timeBegin).diff(dayjs(pointA.time.timeBegin));
