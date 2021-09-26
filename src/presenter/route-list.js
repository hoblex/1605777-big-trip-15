import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import ListEmptyView from '../view/list-empty';
import {render, RenderPosition, remove} from '../utils/render';
import PointPresenters, {State as PointPresenterViewState} from './point';
import PointNewPresenter from './point-new.js';
import {sortTimePointDown, sortDatePointUp, sortPricePointDown} from '../utils/point';
import {SortType, UpdateType, UserAction, FilterBy} from '../const';
import {filter} from '../utils/filter.js';
import LoadingView from '../view/loading.js';

export default class RouteList {
  constructor(routeListContainer, pointsModel, descriptionsList, offersList, filterModel, api) {
    this._routeListContainer = routeListContainer;
    this._pointsModel = pointsModel;
    this._descriptionsList = descriptionsList;
    this._offersList = offersList;
    this._filterModel = filterModel;
    this._pointPresenters = new Map();
    this._filterType = FilterBy.EVERYTHING;
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._noPointsComponent = null;

    this._tripPointsListCopmonent = new TripPointsListView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    render(this._routeListContainer, this._tripPointsListCopmonent);
    this._renderRouteList();
  }

  destroy() {
    this._clearRouteList({resetSortType: true});

    remove(this._tripPointsListCopmonent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterBy.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDatePointUp);
      case SortType.TIME:
        return filteredPoints.sort(sortTimePointDown);
      case SortType.PRICE:
        return filteredPoints.sort(sortPricePointDown);
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenters.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update).then((response) => {
          this._pointsModel.addPoint(updateType, response);
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenters.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update).then(() => {
          this._pointsModel.deletePoint(updateType, update);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    const pointPresenter = new PointPresenters(this._tripPointsListCopmonent, this._handleViewAction, this._handleModeChange, this._descriptionsList, this._offersList);
    pointPresenter.init(point);
    this._pointPresenters.set(point.id, pointPresenter);
  }

  _renderPoints (points) {
    points.forEach((point) => this._renderPoint(point));
    this._pointNewPresenter = new PointNewPresenter(this._tripPointsListCopmonent, this._handleViewAction, this._descriptionsList, this._offersList);
  }

  _renderLoading() {
    render(this._routeListContainer, this._loadingComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderNoPoints() {
    this._noPointsComponent = new ListEmptyView(this._filterType);
    render(this._routeListContainer, this._noPointsComponent);
  }

  _clearRouteList(resetSortType = false) {
    this._pointPresenters.forEach((presenter) => presenter.destroy());
    this._pointPresenters.clear();
    this._pointNewPresenter.destroy();

    remove(this._sortComponent);
    remove(this._loadingComponent);

    if (this._noPointsComponent) {
      remove(this._noPointsComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderRouteList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

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

