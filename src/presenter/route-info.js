import {remove, render, RenderPosition, replace} from '../utils/render';
import RouteInfoView from '../view/route-info';

export default class RouteInfo {
  constructor(routeInfoContainer, pointsModel) {
    this._routeInfoContainer = routeInfoContainer;
    this._pointsModel = pointsModel;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._routeInfoComponent = null;
  }

  init() {
    if(this._pointsModel.getPoints().length === 0) {
      return;
    }
    this._points = this._pointsModel.getPoints().slice();
    if (this._points.length !== 0) {
      this._tripPrice = this._points.reduce((accumulator, item) => (accumulator + item.pointCost + item.additionalOptions.reduce((summ, elem) => (summ + elem.price),0)), 0);
      const prevRouteInfoComponent = this._routeInfoComponent;
      this._routeInfoComponent = new RouteInfoView(this._points, this._tripPrice);

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
