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
import Api from './api';

// const POINTS_COUNT = 15;
// console.log(new Array(POINTS_COUNT).fill().map(() => generatePoint()));

const AUTHORIZATION = 'Basic gL3df6yrPwhf5dp5b';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip/';
const api = new Api(END_POINT, AUTHORIZATION);

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');

const pointsModel = new PointsModel();
// pointsModel.setPoints(pointsList);

const siteMenu = new MenuPresenter(tripControlsNavigation, pointsModel);

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

filterPresenter.init();
routeListPresenter.init();
routeInfo.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  routeListPresenter.createPoint();
});

api.getPoints()
  .then((points) => {
    const cityList = new Set();
    const descriptionList = new Map();
    const additionalOptionsList = new Map();
    points.forEach((item)=> cityList.add(item.city));
    points.forEach((item) => item.cityList = cityList);

    points.forEach((item) => descriptionList.set(item.destination[0], item.destination[1]));
    points.forEach((item) => item.description = descriptionList);

    points.forEach((item) => additionalOptionsList.set(item.pointType, item.offers.map((one) => Object.values(one))));
    points.forEach((item) => item.additionalOptions = additionalOptionsList);

    return points;
  })
  .then((points) => {
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });
