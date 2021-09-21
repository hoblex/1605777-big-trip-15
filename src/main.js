import SiteMenu from './view/menu';
import {generatePoint} from './mock/point';
import {render} from './utils/render.js';
import RouteList from './presenter/route-list';
import RouteInfo from './presenter/route-info';
import PointsModel from './model/points';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter';

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, new SiteMenu());

const POINTS_COUNT = 5;
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

filterPresenter.init();
routeListPresenter.init();
routeInfo.init();

