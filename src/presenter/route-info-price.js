import {render} from '../utils/render';
import TripPrice from '../view/trip-price';

export default class routeInfoPrice {
  constructor(routeInfoContainer) {
    this._routeInfoPriceContainer = routeInfoContainer;
  }

  init(points) {
    this._points = points.slice();
    this._tripPrice = this._points.reduce((accumulator, item) => (accumulator + item.pointCost), 0);
    this._renderRouteInfoPrice();
  }

  _renderInfo() {
    render(this._routeInfoPriceContainer, new TripPrice(this._tripPrice));
  }

  _renderRouteInfoPrice() {
    if (this._points.length === 0) {
      return;
    }
    this._renderInfo();
  }
}
