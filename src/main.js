import SiteMenu from './view/menu';
import Filter from './view/filters.js';
import {generatePoint} from './mock/point';
import RouteCitiesContainerView from './view/route-cities-container';
import {render, RenderPosition} from './utils/render.js';
import RouteList from './presenter/route-list';
import RouteInfoCities from './presenter/route-info-cities';
import RouteInfoPrice from './presenter/route-info-price';
import PointsModel from './model/points';

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, new SiteMenu());

//Добавляет фильтры
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new Filter());

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

const pointsModel = new PointsModel();
pointsModel.setPoints(pointsList);

//Контейнер для контента
const tripEvents = document.querySelector('.trip-events');


const routeListPresenter = new RouteList(tripEvents);
//Добавляет контейнер с информацией о маршруте
const routeInfoContainer = document.querySelector('.trip-main');
const routeInfoCitiesContainer = new RouteCitiesContainerView();
render(routeInfoContainer, routeInfoCitiesContainer, RenderPosition.AFTER_BEGIN);
//Добавляет информацию о маршруте: города
const routeInfoCities = new RouteInfoCities(routeInfoCitiesContainer);
//Добавляет информацию о маршруте: стоимость
const routeInfoPrice = new RouteInfoPrice(routeInfoCitiesContainer);

routeListPresenter.init(pointsList);
routeInfoCities.init(pointsList);
routeInfoPrice.init(pointsList);

