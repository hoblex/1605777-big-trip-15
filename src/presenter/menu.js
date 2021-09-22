import {remove, render, replace} from '../utils/render';
import MenuView from '../view/menu';
import {MenuItem} from '../const';

export default class Menu {
  constructor(menuContainer, pointsModel, menuCurrent = MenuItem.TABLE) {
    this._menuCurrent = menuCurrent;
    this._menuContainer = menuContainer;
    this._handleMenuClick = null;
    this._pointsModel = pointsModel;
    this._menuComponent = new MenuView(this._menuCurrent);
    this._prevMenuComponent = this._menuComponent;
    render(this._menuContainer, this._menuComponent);
  }

  init(menuCurrent, handleMenuClick = this._handleMenuClick) {

    this._menuCurrent = menuCurrent;
    this._handleMenuClick = handleMenuClick;
    this._renderMenu(handleMenuClick);
  }

  _renderMenu(handleMenuClick) {
    this._prevMenuComponent = this._menuComponent;
    this._menuComponent = new MenuView(this._menuCurrent);
    this._menuComponent.setMenuClickHandler(handleMenuClick);

    replace(this._menuComponent, this._prevMenuComponent);
    remove(this._prevMenuComponent);
  }
}
