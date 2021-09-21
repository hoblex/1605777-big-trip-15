import FilterView from '../view/filter.js';
import {render, replace, remove} from '../utils/render.js';
import {FilterBy, UpdateType} from '../const.js';

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._currentFilter = FilterBy.EVERYTHING;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init(current = this._currentFilter) {
    this._renderFilter(current);
  }

  _handleModelEvent(type, current) {
    this.init(current);
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._currentFilter = filterType;
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _renderFilter(current) {
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(current);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }
}
