import SiteMenu from './view/menu';
import TripCities from './view/trip-cities.js';
import TripPrice from './view/trip-price.js';
import Filter from './view/filters.js';
import {generatePoint} from './mock/point';
import RouteCitiesContainerView from './view/route-cities-container';
import {render, RenderPosition} from './utils/render.js';
import RouteList from './presenter/route-list';

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, new SiteMenu());

//Добавляет фильтры
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new Filter());

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

//Контейнер для контента
const tripEvents = document.querySelector('.trip-events');

if (pointsList.length !== 0) {
  const routeListPresenter = new RouteList(tripEvents);
  //Добавляет контейнер с информацией о маршруте
  const routeInfoContainer = document.querySelector('.trip-main');
  const routeInfoCitiesContainer = new RouteCitiesContainerView();
  render(routeInfoContainer, routeInfoCitiesContainer, RenderPosition.AFTER_BEGIN);

  //Добавляет информацию о маршруте: города
  const routeCityList = new Set();
  const routeDateList = new Set();
  pointsList.forEach((item) => routeCityList.add(item.city));
  pointsList.forEach((item) => routeDateList.add([item.time.timeBegin, item.time.timeEnd]));
  render(routeInfoCitiesContainer, new TripCities(routeCityList, routeDateList));

  //Добавляет информацию о маршруте: стоимость
  // const routeInfoPrice = routeInfoContainer.querySelector('.trip-info');
  const tripPrice = pointsList.reduce((accumulator, item) => (accumulator + item.pointCost), 0);
  render(routeInfoCitiesContainer, new TripPrice(tripPrice));

  routeListPresenter.init(pointsList);
} else {
  const routeListPresenter = new RouteList(tripEvents);
  routeListPresenter.init(pointsList);
}

