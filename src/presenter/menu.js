import {remove, render, replace} from '../utils/render';
import MenuView from '../view/menu';
import {MenuItem} from '../const';

export default class Menu {
  constructor(menuContainer, menuCurrent = MenuItem.TABLE, handleSiteMenuClick) {
    this._menuComponent = null;
    this._menuCurrent = menuCurrent;
    this._menuContainer = menuContainer;
    this._handleMenuClick = handleSiteMenuClick;
  }

  init() {
    this._renderMenu();
  }

  _renderMenu() {
    const prevMenuComponent = this._menuComponent;

    this._menuComponent = new MenuView(this._menuCurrent);
    this._menuComponent.setMenuClickHandler(this._handleMenuClick);

    if (prevMenuComponent === null) {
      render(this._menuContainer, this._menuComponent);
      return;
    }
    replace(this._menuComponent, prevMenuComponent);
    remove(prevMenuComponent);
  }
}
