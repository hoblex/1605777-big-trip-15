import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import ListEmptyView from '../view/list-empty';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';
import PointPresenter from './point';
import {sortDatePointUp, sortDatePointDown} from '../utils/point';
import {SortType} from '../const';

export default class RouteList {
  constructor(routeListContainer) {
    this._routeListContainer = routeListContainer;
    this._pointPresenters = new Map();

    this._tripPointsListCopmonent = new TripPointsListView();
    this._sortComponent = new SortView();
    this._emptyListComponent = new ListEmptyView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    render(this._routeListContainer, this._tripPointsListCopmonent);
    this._renderRouteList();
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  _sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE_UP:
        this._points.sort(sortDatePointUp);
        break;
      case SortType.DATE_DOWN:
        this._points.sort(sortDatePointDown);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);

    this._clearRouteList();
    this._renderPoints();
  }

  _renderSort() {
    render(this._routeListContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripPointsListCopmonent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints () {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._routeListContainer, this._emptyListComponent);
  }

  _clearRouteList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
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

