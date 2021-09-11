import SiteMenu from './view/menu';
import TripInfoCities from './view/trip-info-cities.js';
import TripInfoPrice from './view/trip-info-price.js';
import Filter from './view/filters.js';
import Sort from './view/sort.js';
import TripPointsListView from './view/trip-points-list.js';
import PointFormView from './view/point-form.js';
import TripPointView from './view/trip-point.js';
import {generatePoint} from './mock/point';
import ListEmpty from './view/list-empty';
import RouteCitiesContainerView from './view/route-cities-container';
import {render, RenderPosition} from './view/utils.js';

//Добавляет основное меню
const tripControlsNavigation = document.querySelector('.trip-controls__navigation');
render(tripControlsNavigation, new SiteMenu().getElement());

//Добавляет фильтры
const filtersContainer = document.querySelector('.trip-controls__filters');
render(filtersContainer, new Filter().getElement());

const POINTS_COUNT = 15;
const pointsList = new Array(POINTS_COUNT).fill().map(() => generatePoint());

//Контейнер для контента
const tripEvents = document.querySelector('.trip-events');

if (pointsList.length === 0) {
  render(tripEvents, new ListEmpty().getElement());
} else {
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

  //Добавляет форму для сортировки
  render(tripEvents, new Sort().getElement());
  //Добавляет контейнер для списка точек маршрута
  const pointsListContainer = new TripPointsListView();
  render(tripEvents, pointsListContainer.getElement());

  //Добавляет временные точки для отображения в списке точек маршрута
  const renderPoint = (pointListElement, point) => {
    const pointComponent = new TripPointView(point);
    const pointFormComponent = new PointFormView(point);

    const replacePointViewToForm = () => {
      pointListElement.replaceChild(pointFormComponent.getElement(), pointComponent.getElement());
    };

    const replaceFormToPointView = () => {
      pointListElement.replaceChild(pointComponent.getElement(), pointFormComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPointView();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointViewToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointFormComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPointView();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPointView();
    });

    render(pointListElement, pointComponent.getElement());
  };

  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(pointsListContainer.getElement(), pointsList[i]);
  }
}
