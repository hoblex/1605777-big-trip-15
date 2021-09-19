import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import ListEmptyView from '../view/list-empty';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';
import PointPresenter from './point';
import {sortTimePointDown, sortDatePointDown, sortPricePointDown} from '../utils/point';
import {SortType} from '../const';

export default class RouteList {
  constructor(routeListContainer, pointsModel) {
    this._routeListContainer = routeListContainer;
    this._pointsModel = pointsModel;
    this._pointPresenters = new Map();
    this._currentSortType = SortType.DAY;

    this._tripPointsListCopmonent = new TripPointsListView();
    this._sortComponent = new SortView();
    this._emptyListComponent = new ListEmptyView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._routeListContainer, this._tripPointsListCopmonent);
    this._renderRouteList();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortDatePointDown);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTimePointDown);
      case SortType.PRICE:
        this._points.sort(sortPricePointDown);
        return this._pointsModel.getPoints().slice().sort(sortPricePointDown);
    }
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._pointPresenters.get(updatedPoint.id).init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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

  _renderPoints (points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._routeListContainer, this._emptyListComponent);
  }

  _clearRouteList() {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
  }

  _renderRouteList() {
    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
  }
}

