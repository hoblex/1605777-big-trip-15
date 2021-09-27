import AbstractView from './abstract';

const createTripPointsListContainer = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripPointsList extends AbstractView {
  getTemplate() {
    return createTripPointsListContainer();
  }
}
