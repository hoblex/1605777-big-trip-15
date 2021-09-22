import StatisticsView from './view/statistics';
import {generatePoint} from './mock/point';
import {render, remove} from './utils/render.js';
import RouteList from './presenter/route-list';
import RouteInfo from './presenter/route-info';
import PointsModel from './model/points';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter';
import {MenuItem, UpdateType, FilterBy} from './const';
import MenuPresenter from './presenter/menu';

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

const pointsModel = new PointsModel();
pointsModel.setPoints(pointsList);

const filterModel = new FilterModel();

//Добавляет фильтры
const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

//Добавляет контейнер с информацией о маршруте
const routeInfoContainer = document.querySelector('.trip-main');
//Добавляет информацию о маршруте: города и стоимость
const routeInfo = new RouteInfo(routeInfoContainer, pointsModel);

//Контейнер для контента
const tripEventsContainer = document.querySelector('.trip-events');
const routeListPresenter = new RouteList(tripEventsContainer, pointsModel, filterModel);

let statisticsComponent = null;
//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const siteMenu = new MenuPresenter(tripControlsNavigation);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      siteMenu.init(menuItem);
      routeListPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterBy.EVERYTHING);
      routeListPresenter.init();
      break;
    case MenuItem.STATS:
      siteMenu.init(menuItem);
      routeListPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(tripEventsContainer, statisticsComponent);
      break;
  }
};

siteMenu.init(MenuItem.TABLE, handleSiteMenuClick.bind(this));
// siteMenuComponent.setMenuClickHandler();

filterPresenter.init();
routeListPresenter.init();
routeInfo.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  routeListPresenter.createPoint();
});

