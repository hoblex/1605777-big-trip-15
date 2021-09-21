import {FilterBy} from '../const';
import AbstractObserver from '../utils/abstract-observer';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterBy.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
