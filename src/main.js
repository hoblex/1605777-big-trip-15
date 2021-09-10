import SiteMenu from './view/menu';
import TripInfoCities from './view/trip-info-cities.js';
import TripInfoPrice from './view/trip-info-price.js';
import Filter from './view/filters.js';
import Sort from './view/sort.js';
import TripPointsListView from './view/trip-points-list.js';
import PointItemContainerView from './view/trip-point-item-container.js';
import PointFormView from './view/point-form.js';
import TripPointView from './view/trip-point.js';
import {generatePoint} from './mock/point';
import {render, RenderPosition} from './view/utils.js';
import RouteCitiesContainerView from './view/route-cities-container';
import TripPointItemContainer from './view/trip-point-item-container.js';

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, new SiteMenu().getElement());

//Добавляет контейнер с информацией о маршруте
const routeInfoContainer = document.querySelector('.trip-main');
const routeInfoCitiesContainer = new RouteCitiesContainerView();
render(routeInfoContainer, routeInfoCitiesContainer.getElement(), RenderPosition.AFTER_BEGIN);

//Добавляет информацию о маршруте: города
const routeCityList = new Set();
const routeDateList = new Set();
pointsList.forEach((item) => routeCityList.add(item.city));
pointsList.forEach((item) => routeDateList.add([item.time.timeBegin, item.time.timeEnd]));
render(routeInfoCitiesContainer.getElement(), new TripInfoCities(routeCityList, routeDateList).getElement());

//Добавляет информацию о маршруте: стоимость
// const routeInfoPrice = routeInfoContainer.querySelector('.trip-info');
const tripPrice = pointsList.reduce((accumulator, item) => (accumulator + item.pointCost), 0);
render(routeInfoCitiesContainer.getElement(), new TripInfoPrice(tripPrice).getElement());

//Добавляет фильтры
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new Filter().getElement());

//Контейнер для контента
const tripEvents = document.querySelector('.trip-events');

//Добавляет форму для сортировки
render(tripEvents, new Sort().getElement());

//Добавляет контейнер для списка точек маршрута
const pointsListContainer = new TripPointsListView();
render(tripEvents, pointsListContainer.getElement());

//Добавляет временные точки для отображения в списке точек маршрута
const renderPoint = (pointListElement, point) => {
  const pointComponent = new TripPointView(point);
  const pointFormComponent = new PointFormView(point);

  render(pointListElement, pointComponent.getElement());
};

for (let i = 0; i < POINTS_COUNT; i++) {
  const pointContainer = new TripPointItemContainer();
  render(pointsListContainer.getElement(), pointContainer.getElement());
  renderPoint(pointContainer.getElement(), pointsList[i]);
}
