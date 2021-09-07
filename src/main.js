import {
  createMenuTemplate
} from './view/menu';
import {
  createTripInfoContainer
} from './view/trip-info-container.js';
import {
  createTripInfoCities
} from './view/trip-info-cities.js';
import {
  createTripInfoPrice
} from './view/trip-info-price.js';
import {
  createFilters
} from './view/filters.js';
import {
  createSort
} from './view/sort.js';
import {
  createTripPointsListContainer
} from './view/trip-points-list.js';
import {
  createPointItemContainer
} from './view/trip-point-item.js';
import {
  createPointForm
} from './view/point-form.js';
import {
  createTemporaryTripPoint
} from './view/point.js';
import {
  generatePoint
} from './mock/point';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

const Placement = {
  BEFORE_END: 'beforeend',
  AFTER_BEGIN: 'afterbegin',
};

const render = (container, template, place = Placement.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, createMenuTemplate());

//Добавляет контейнер с информацией о маршруте
const routeInfoContainer = document.querySelector('.trip-main');
render(routeInfoContainer, createTripInfoContainer(), Placement.AFTER_BEGIN);

//Добавляет информацию о маршруте: города
const routeInfoCities = routeInfoContainer.querySelector('.trip-info');
const routeCityList = new Set();
const routeDateList = new Set();
pointsList.forEach((item) => routeCityList.add(item.city));
pointsList.forEach((item) => routeDateList.add([item.time.timeBegin, item.time.timeEnd]));
render(routeInfoCities, createTripInfoCities(routeCityList, routeDateList));

//Добавляет информацию о маршруте: стоимость
const routeInfoPrice = routeInfoContainer.querySelector('.trip-info');
const tripPrice = pointsList.reduce((accumulator, item) => (accumulator + item.pointCost), 0);
render(routeInfoPrice, createTripInfoPrice(tripPrice));

//Добавляет фильтры
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, createFilters());

//Контейнер для контента
const tripEvents = document.querySelector('.trip-events');

//Добавляет форму для сортировки
render(tripEvents, createSort());

//Добавляет контейнер для списка точек маршрута
render(tripEvents, createTripPointsListContainer());

//Список точек маршрута
const tripEventsList = tripEvents.querySelector('.trip-events__list');

//Добавляет контейнер для элемента списка маршрута
render(tripEventsList, createPointItemContainer());

//Элемент списка маршрута
const tripEventItem = tripEventsList.querySelector('.trip-events__item');

//Добавляет форму создания новой точки маршрута
render(tripEventItem, createPointForm(pointsList[0]));

//Добавляет временные точки для отображения в списке точек маршрута

for (let i = 1; i < POINTS_COUNT; i++) {
  render(tripEventItem, createTemporaryTripPoint(pointsList[i]));
  // const offersContainer = document.querySelector('.event__selected-offers');
  // console.log(offersContainer);
}
