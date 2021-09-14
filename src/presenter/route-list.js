import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import TripPointView from '../view/trip-point';
import TripPointFormView from '../view/trip-point-form';
import ListEmptyView from '../view/list-empty';
import TripCitiesView from '../view/trip-cities';
import TripPriceView from '../view/trip-price';
import PointPresenter from 'point';
import {render} from '../utils/render';

export default class routeList {
  constructor(routeListContainer) {
    this._routeListContainer = routeListContainer;
    this._pointPresenter = new Map();

    this._tripPointsListCopmonent = new TripPointsListView();
    this._sortComponent = new SortView();
    this._emptyListComponent = new ListEmptyView();

    this._onePointChange = this._onePointChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);

    this._tripInfoCitiesComponent = new TripCitiesView();
    this._tripPriceComponent = new TripPriceView();
  }

  init(points) {
    this._points = points.slice();

    render(this._routeListContainer, this._tripPointsListCopmonent);

    this._renderRouteList();
  }

  _onModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    render(this._routeListContainer, this._sortComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripPointsListCopmonent, this._onPointChange, this._onModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
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

  _clearPointsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderRouteCities() {

  }

  _renderTripPrice() {

  }
}

