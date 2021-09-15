import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import ListEmptyView from '../view/list-empty';
import {render} from '../utils/render';
import PointPresenter from './point.js';

export default class RouteList {
  constructor(routeListContainer) {
    this._routeListContainer = routeListContainer;

    this._tripPointsListCopmonent = new TripPointsListView();
    this._sortComponent = new SortView();
    this._emptyListComponent = new ListEmptyView();
  }

  init(points) {
    this._points = points.slice();
    render(this._routeListContainer, this._tripPointsListCopmonent);
    this._renderRouteList();
  }

  _renderSort() {
    render(this._routeListContainer, this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripPointsListCopmonent);
    pointPresenter.init(point);
  }

  _renderPoints () {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._routeListContainer, this._emptyListComponent);
  }

  _renderRouteList() {
    if (this._points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
  }
}

