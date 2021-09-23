import dayjs from 'dayjs';

export const sortDatePointDown = (pointA, pointB) => dayjs(pointB.time.timeBegin).diff(dayjs(pointA.time.timeBegin));

export const sortDatePointUp = (pointA, pointB) => dayjs(pointA.time.timeBegin).diff(dayjs(pointB.time.timeBegin));

export const sortTimePointDown = (pointA, pointB) => (pointB.time.timeDuration.asSeconds() - pointA.time.timeDuration.asSeconds());

export const sortPricePointDown = (pointA, pointB) => (pointB.pointCost - pointA.pointCost);
