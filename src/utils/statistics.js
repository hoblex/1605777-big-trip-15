export const countMoneyByType = (points, type) =>
  points.filter((item) => item.pointType === type.toLowerCase()).reduce(((summa, point) => summa + point.pointCost), 0);

export const countAmountByType =
  (points, type) => points.filter((point) => point.pointType === type.toLowerCase()).length;

export const countDurationByTime = (points, type) =>
  points.filter((item) => item.pointType === type.toLowerCase()).reduce(((summa, point) => summa + point.time.timeDuration.asMilliseconds()), 0);


