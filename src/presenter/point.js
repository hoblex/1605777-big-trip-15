import TripPointView from '../view/trip-point';
import TripPointFormView from '../view/trip-point-form';
import {render, replace, remove} from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointsContainer, changeData, changeMode) {
    this._pointsContainer = pointsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEditClick = this._onEditClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
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
    this._pointComponent.setFavoriteClickHandler(this._onFavoriteClick);
    this._pointFormComponent.setFormSubmitHandler(this._onFormSubmit);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this._pointsContainer, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointFormComponent, prevPointFormComponent);
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
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPointView() {
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
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

  _onFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._task.isFavorite,
        },
      ),
    );
  }

  _onFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToPointView();
  }
}
