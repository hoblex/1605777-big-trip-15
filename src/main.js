import SiteMenu from './view/menu';
import TripCities from './view/trip-cities.js';
import TripPrice from './view/trip-price.js';
import Filter from './view/filters.js';
import Sort from './view/sort.js';
import TripPointsListView from './view/trip-points-list.js';
import TripPointFormView from './view/trip-point-form.js';
import TripPointView from './view/trip-point.js';
import {generatePoint} from './mock/point';
import ListEmptyView from './view/list-empty';
import RouteCitiesContainerView from './view/route-cities-container';
import {render, RenderPosition, replace} from './utils/render.js';

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

if (pointsList.length === 0) {
  render(tripEvents, new ListEmptyView());
} else {
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

  //Добавляет форму для сортировки
  render(tripEvents, new Sort());
  //Добавляет контейнер для списка точек маршрута
  const pointsListContainer = new TripPointsListView();
  render(tripEvents, pointsListContainer);

  //Добавляет временные точки для отображения в списке точек маршрута
  const renderPoint = (pointsContainer, point) => {
    const pointComponent = new TripPointView(point);
    const pointFormComponent = new TripPointFormView(point);

    const replacePointViewToForm = () => {
      replace(pointFormComponent, pointComponent);
    };

    const replaceFormToPointView = () => {
      replace(pointComponent, pointFormComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPointView();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setFormClickHandler(() => {
      replacePointViewToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointFormComponent.setFormSubmitHandler(() => {
      replaceFormToPointView();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointFormComponent.setFormClickCloseHandler(() => {
      replaceFormToPointView();
    });

    render(pointsContainer, pointComponent);
  };

  for (let i = 0; i < POINTS_COUNT; i++) {
    renderPoint(pointsListContainer, pointsList[i]);
  }
}
