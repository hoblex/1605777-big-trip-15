import {render} from '../utils/render';
import TripCities from '../view/trip-cities';

export default class routeInfoCities {
  constructor(routeInfoCitiesContainer) {
    this._routeInfoCitiesContainer = routeInfoCitiesContainer;
  }

  init(points) {
    this._points = points.slice();
    this._routeCityList = new Set();
    this._routeDateList = new Set();
    this._points.forEach((item) => this._routeCityList.add(item.city));
    this._points.forEach((item) => this._routeDateList.add([item.time.timeBegin, item.time.timeEnd]));
    this._renderRouteInfoCities();
  }

  _renderInfo() {
    render(this._routeInfoCitiesContainer, new TripCities(this._routeCityList, this._routeDateList));
  }

  _renderRouteInfoCities() {
    if (this._points.length === 0) {
      return;
    }
    this._renderInfo();
  }
}
