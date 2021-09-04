import {createMenuTemplate} from './view/menu';
import {createTripInfoContainer} from './view/trip-info-container.js';
import {createTripInfoCities} from './view/trip-info-cities.js';
import {createTripInfoPrice} from './view/trip-info-price.js';
import {createFilters} from './view/filters.js';
import {createSort} from './view/sort.js';
import {createTripPointsListContainer} from './view/trip-points-list.js';
import {createPointItemContainer} from './view/trip-point-item.js';
import {createNewPointForm} from './view/add-new-point-form.js';
import {createEditPointForm} from './view/edit-point-form.js';
import {createTemporaryTripPoint} from './view/temp-point.js';
import {generatePoint} from './mock/point';

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, createMenuTemplate(), 'beforeend');

//Добавляет контейнер с информацией о маршруте
const routeInfoContainer = document.querySelector('.trip-main');
render(routeInfoContainer, createTripInfoContainer(), 'afterbegin');

//Добавляет информацию о маршруте: города
const routeInfoCities = routeInfoContainer.querySelector('.trip-info');
render(routeInfoCities, createTripInfoCities(), 'beforeend');

//Добавляет информацию о маршруте: стоимость
const routeInfoPrice = routeInfoContainer.querySelector('.trip-info');
render(routeInfoPrice, createTripInfoPrice(), 'beforeend');

//Добавляет фильтры
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, createFilters(), 'beforeend');

//Контейнер для контента
const tripEvents = document.querySelector('.trip-events');

//Добавляет форму для сортировки
render(tripEvents, createSort(), 'beforeend');

//Добавляет контейнер для списка точек маршрута
render(tripEvents, createTripPointsListContainer(), 'beforeend');

//Список точек маршрута
const tripEventsList = tripEvents.querySelector('.trip-events__list');

//Добавляет контейнер для элемента списка маршрута
render(tripEventsList, createPointItemContainer(), 'beforeend');

//Элемент списка маршрута
const tripEventItem = tripEventsList.querySelector('.trip-events__item');

//Добавляет форму редактирования точки маршрута
render(tripEventItem, createEditPointForm(), 'beforeend');

//Добавляет форму создания новой точки маршрута
render(tripEventItem, createNewPointForm(), 'beforeend');

//Добавляет временные точки для отображения в списке точек маршрута

for (let i = 0; i < POINTS_COUNT; i++) {
  render(tripEventItem, createTemporaryTripPoint(pointsList[i]), 'beforeend');
  // const offersContainer = document.querySelector('.event__selected-offers');
  // console.log(offersContainer);
}


