import TripPointsListView from '../view/trip-points-list';
import SortView from '../view/sort';
import TripPointView from '../view/trip-point';
import TripPointFormView from '../view/trip-point-form';
import ListEmptyView from '../view/list-empty';
import {render, replace} from '../utils/render';

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
    const pointComponent = new TripPointView(point);
    const pointFormComponent = new TripPointFormView(point);

    const replacePointViewToForm = () => {
      replace(pointFormComponent, pointComponent);
    };

    const replaceFormToPointView = () => {
      replace(pointComponent, pointFormComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPointView();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setFormClickHandler(() => {
      replacePointViewToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointFormComponent.setFormSubmitHandler(() => {
      replaceFormToPointView();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointFormComponent.setFormClickCloseHandler(() => {
      replaceFormToPointView();
    });

    render(this._tripPointsListCopmonent, pointComponent);
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

