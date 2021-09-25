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
const routeListPresenter = new RouteList(tripEventsContainer, pointsModel, filterModel, api);

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

filterPresenter.init();
routeListPresenter.init();
routeInfo.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  routeListPresenter.createPoint();
});

const getPointsPromise = api.getPoints()
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const getDescriptionsPromise = api.getDestination()
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const getOffersPromise = api.getOffers()
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

Promise.all([getPointsPromise, getDescriptionsPromise, getOffersPromise])
  .then((values) => {
    // values[0].forEach((item) => {
    //   item.fullDestinationsDescriptionList = values[1];
    //   item.fullAdditionalOptionsList = values[2];
    // });
    pointsModel.setPoints(UpdateType.INIT, values[0], values[1], values[2]);
    tableStats.init(TableStatsItems.TABLE, handleTableStatsClick.bind(this));
  });
