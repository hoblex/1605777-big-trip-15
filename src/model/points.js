import AbstractObserver from '../utils/abstract-observer.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
    this._fullDestinationsDescriptionList = null;
    this._fullAdditionalOptionsList = null;
  }

  setPoints(updateType, pointsList, descriptionList, offersList) {
    this._points = pointsList.slice();
    this._points.forEach((item) => {
      this._fullDestinationsDescriptionList = descriptionList;
      this._fullAdditionalOptionsList = offersList;
      item.fullDestinationsDescriptionList = this._fullDestinationsDescriptionList;
      item.fullAdditionalOptionsList = this._fullAdditionalOptionsList;
    });
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    update.fullDestinationsDescriptionList = this._fullDestinationsDescriptionList;
    update.fullAdditionalOptionsList = this._fullAdditionalOptionsList;

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        pointType: point['type'],
        additionalOptions: point['offers'],
        city: point['destination']['name'],
        time: Object.fromEntries([['timeBegin', dayjs(point['date_from'])], ['timeEnd', dayjs(point['date_to'])], ['timeDuration', dayjs.duration(dayjs(point['date_to']).diff(dayjs(point['date_from'])))]]),
        pointCost: point['base_price'],
        isFavorite: point['is_favorite'],
      },
    );

    delete adaptedPoint['base_price'];
    delete adaptedPoint['type'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['offers'];

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': parseInt(point.pointCost, 10),
        'date_from': point.time.timeBegin.toISOString(),
        'date_to': point.time.timeEnd.toISOString(),
        'is_favorite': point.isFavorite,
        'offers': point.additionalOptions,
        'destination': point.destination,
        'type': point.pointType,
      },
    );

    delete adaptedPoint.additionalOptions;
    delete adaptedPoint.city;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.fullAdditionalOptionsList;
    delete adaptedPoint.fullDestinationsDescriptionList;
    delete adaptedPoint.pointCost;
    delete adaptedPoint.pointType;
    delete adaptedPoint.time;

    console.log(adaptedPoint);

    return adaptedPoint;
  }
}
