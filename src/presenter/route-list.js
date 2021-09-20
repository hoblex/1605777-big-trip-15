import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import ListEmptyView from '../view/list-empty';
import {render, RenderPosition, remove} from '../utils/render';
import PointPresenter from './point';
import {sortTimePointDown, sortDatePointDown, sortPricePointDown} from '../utils/point';
import {SortType, UpdateType, UserAction} from '../const';
import {filter} from '../utils/filter.js';

export default class RouteList {
  constructor(routeListContainer, pointsModel, filterModel) {
    this._routeListContainer = routeListContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointPresenters = new Map();
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;

    this._tripPointsListCopmonent = new TripPointsListView();
    this._emptyListComponent = new ListEmptyView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._routeListContainer, this._tripPointsListCopmonent);
    this._renderRouteList();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);
    console.log(filteredPoints);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDatePointDown);
      case SortType.TIME:
        return filteredPoints.sort(sortTimePointDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPricePointDown);
    }
  }

  _handleModeChange() {
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearRouteList();
        this._renderRouteList();
        break;
      case UpdateType.MAJOR:
        this._clearRouteList({resetSortType: true});
        this._renderRouteList();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    const points = this._getPoints().slice();
    this._currentSortType = sortType;

    this._clearRouteList();
    this._renderRouteList(points);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._routeListContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripPointsListCopmonent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints (points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._routeListContainer, this._emptyListComponent);
  }

  _clearRouteList(resetSortType = false) {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();

    remove(this._sortComponent);
    remove(this._emptyListComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderRouteList() {
    const points = this._getPoints();
    const pointCount = points.length;

    if(pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points);
  }
}

