import AbstractView from './abstract';

const createRouteCitiesContainer = () => (
  `<section class="trip-main__trip-info  trip-info">
  </section>`
);

export default class RouteCitiesContainer extends AbstractView {
  getTemplate() {
    return createRouteCitiesContainer();
  }
}
