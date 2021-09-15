import TripPointView from '../view/trip-point';
import TripPointFormView from '../view/trip-point-form';
import {render, replace} from '../utils/render';

export default class Point {
  constructor(pointsContainer) {
    this._pointsContainer = pointsContainer;

    this._pointComponent = null;
    this._pointFormComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new TripPointView(point);
    this._pointFormComponent = new TripPointFormView(point);

    this._pointComponent.setFormClickHandler(this._handleEditClick);
    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointFormComponent.setFormClickCloseHandler(this._handleFormSubmit);

    render(this._pointsContainer, this._pointComponent);
  }

  _replacePointViewToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPointView() {
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPointView();
    }
  }

  _handleEditClick() {
    this._replacePointViewToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPointView();
  }

  _handleFavoriteClick() {

  }
}
