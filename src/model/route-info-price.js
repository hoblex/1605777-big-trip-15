import AbstractObserver from '../utils/abstract-observer';

export default class RouteInfoPrice extends AbstractObserver {
  constructor(price) {
    super();
    this._price = price;
  }

  setPrice(updateType, price) {
    this._price = price;
    this._notify(price);
  }
}
