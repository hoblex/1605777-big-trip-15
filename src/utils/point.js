import dayjs from 'dayjs';

export const sortDatePointUp = (pointA, pointB) => dayjs(pointA.time.timeBegin).diff(dayjs(pointB.time.timeBegin));

export const sortTimePointDown = (pointA, pointB) => (pointB.time.timeDuration.asSeconds() - pointA.time.timeDuration.asSeconds());

export const sortPricePointDown = (pointA, pointB) => (pointB.pointCost - pointA.pointCost);
