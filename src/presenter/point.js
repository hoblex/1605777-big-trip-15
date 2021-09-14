import TripPointView from '../view/trip-point';
import TripPointFormView from '../view/trip-point-form';
import {render, replace} from '../utils/render';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointFormComponent = null;

    this._onEditClick = this._onEditClick.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new TripPointView(point);
    this._pointFormComponent = new TripPointFormView(point);

    this._pointComponent.setEditClickHandler(this._onEditClick);
    this._pointFormComponent.setFormSubmitHandler(this._onFormSubmit);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this._pointListContainer, this._pointComponent);
      return;
    }

    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevPointFormComponent.getElement())) {
      replace(this._pontFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  _replacePointViewToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._onEscKeyDown);
  }

  _replaceFormToPointView() {
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._onEscKeyDown);
  }

  _onEscKeyDown (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPointView();
    }
  }

  _onEditClick() {
    this._replacePointViewToForm();
  }

  _onFormSubmit() {
    this._replaceFormToPointView();
  }
}
