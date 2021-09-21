export const countMoneyByType = (points, type) =>
  points.filter((item) => item.pointType === type).reduce(((summa, point) => summa + point.pointCost), 0);

export const countAmountByType = (points, type) => points.filter((point) => point.pointType === type).length;

export const countDurationByType = (points, type) =>
  points.filter((item) => item.pointType === type).reduce(((summa, point) => summa + point.time.timeDuration.minutes()), 0);

