import StatisticsView from './view/statistics';
import {render, remove} from './utils/render.js';
import RouteList from './presenter/route-list';
import RouteInfo from './presenter/route-info';
import PointsModel from './model/points';
import FilterPresenter from './presenter/filter.js';
import FilterModel from './model/filter';
import {TableStatsItems, UpdateType, FilterBy} from './const';
import TableStatsPresenter from './presenter/table-stats';
import Api from './api';

const AUTHORIZATION = 'Basic gL3df6yrPwhf5dp5b';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip/';
const api = new Api(END_POINT, AUTHORIZATION);

const tripControlsNavigation = document.querySelector('.trip-controls__navigation');

const pointsModel = new PointsModel();

const tableStats = new TableStatsPresenter(tripControlsNavigation, pointsModel);

const filterModel = new FilterModel();

const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

const routeInfoContainer = document.querySelector('.trip-main');
const routeInfo = new RouteInfo(routeInfoContainer, pointsModel);

const tripEventsContainer = document.querySelector('.trip-events');
const routeListPresenter = new RouteList(tripEventsContainer, pointsModel, filterModel);

let statisticsComponent = null;

const handleTableStatsClick = (tableStatsItem) => {
  switch (tableStatsItem) {
    case TableStatsItems.TABLE:
      remove(statisticsComponent);
      tableStats.init(tableStatsItem);
      routeListPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterBy.EVERYTHING);
      routeListPresenter.init();
      break;
    case TableStatsItems.STATS:
      tableStats.init(tableStatsItem);
      routeListPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(tripEventsContainer, statisticsComponent);
      break;
  }
};

tableStats.init(TableStatsItems.TABLE, handleTableStatsClick.bind(this));

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
  });
