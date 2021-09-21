import SiteMenuView from './view/menu';
import StatisticsView from './view/statistics';
import {generatePoint} from './mock/point';
import {render, remove} from './utils/render.js';
import RouteList from './presenter/route-list';
import RouteInfo from './presenter/route-info';
import PointsModel from './model/points';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter';
import {MenuItem, UpdateType, FilterBy} from './const';

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
const siteMenuComponent = new SiteMenuView();

render(tripControlsNavigation, siteMenuComponent);

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

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      routeListPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterBy.EVERYTHING);
      routeListPresenter.init();
      break;
    case MenuItem.STATS:
      routeListPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(tripEventsContainer, statisticsComponent);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
routeListPresenter.init();
routeInfo.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  routeListPresenter.createPoint();
});

