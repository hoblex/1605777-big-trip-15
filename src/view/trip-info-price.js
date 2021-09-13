import AbstractView from './abstract';

const createTripInfoPrice = (price) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
   </p>`
);

export default class TripInfoPrice extends AbstractView{
  constructor(price) {
    super();
    this._price = price;
  }

  getTemplate() {
    return createTripInfoPrice(this._price);
  }
}
