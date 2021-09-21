import TripPointView from '../view/point';
import TripPointFormView from '../view/point-form';
import {render, replace, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';

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

    this._handleFormOpenClick = this._handleFormOpenClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new TripPointView(point);
    this._pointFormComponent = new TripPointFormView(point);

    this._pointComponent.setFormClickOpenHandler(this._handleFormOpenClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointFormComponent.setFormClickCloseHandler(this._handleFormSubmit);
    this._pointFormComponent.setDeleteClickHandler(this._handleDeleteClick);

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

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPointView();
    }
  }

  _replacePointViewToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPointView() {
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler (evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._pointFormComponent.reset(this._point);
      this._replaceFormToPointView();
    }
  }

  _handleFormOpenClick() {
    this._replacePointViewToForm();
  }

  _handleFormSubmit(update) {
    const isMinorUpdate = null;
    this._changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this._replaceFormToPointView();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}
