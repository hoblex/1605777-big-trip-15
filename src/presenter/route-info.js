import {remove, render, RenderPosition, replace} from '../utils/render';
import RouteInfo from '../view/route-info';

export default class routeInfo {
  constructor(routeInfoContainer, pointsModel) {
    this._routeInfoContainer = routeInfoContainer;
    this._pointsModel = pointsModel;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);

    this._routeInfoComponent = null;
  }

  init() {
    this._points = this._pointsModel.getPoints().slice();
    if (this._points.length !== 0) {
      this._tripPrice = this._points.reduce((accumulator, item) => (accumulator + item.pointCost), 0);
      const prevRouteInfoComponent = this._routeInfoComponent;
      this._routeCityList = new Set();
      this._routeDateList = new Set();
      this._points.forEach((item) => this._routeCityList.add(item.city));
      this._points.forEach((item) => this._routeDateList.add([item.time.timeBegin, item.time.timeEnd]));
      this._routeInfoComponent = new RouteInfo(this._routeCityList, this._routeDateList, this._tripPrice);

      if (prevRouteInfoComponent === null) {
        render(this._routeInfoContainer, this._routeInfoComponent, RenderPosition.AFTER_BEGIN);
        return;
      }
      replace(this._routeInfoComponent, prevRouteInfoComponent);
      remove(prevRouteInfoComponent);
    } else {
      remove(this._routeInfoComponent);
    }
  }

  _handleModelEvent() {
    this.init();
  }
}
