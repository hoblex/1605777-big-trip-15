import {remove, render, replace} from '../utils/render';
import TableStatsView from '../view/table-stats';
import {TableStatsItems} from '../const';

export default class TableStats {
  constructor(tableStatsContainer, pointsModel, tableStatsCurrent = TableStatsItems.TABLE) {
    this._tableStatsCurrent = tableStatsCurrent;
    this._tableStatsContainer = tableStatsContainer;
    this._handleTableStatsClick = null;
    this._tableStatsComponent = new TableStatsView(this._tableStatsCurrent);
    this._prevTableStatsComponent = this._tableStatsComponent;
    render(this._tableStatsContainer, this._tableStatsComponent);
  }

  init(tableStatsCurrent, handleTableStatsClick = this._handleTableStatsClick) {

    this._tableStatsCurrent = tableStatsCurrent;
    this._handleTableStatsClick = handleTableStatsClick;
    this._renderTableStats(handleTableStatsClick);
  }

  _renderTableStats(handleTableStatsClick) {
    this._prevTableStatsComponent = this._tableStatsComponent;
    this._tableStatsComponent = new TableStatsView(this._tableStatsCurrent);
    this._tableStatsComponent.setTableStatsClickHandler(handleTableStatsClick);

    replace(this._tableStatsComponent, this._prevTableStatsComponent);
    remove(this._prevTableStatsComponent);
  }
}
