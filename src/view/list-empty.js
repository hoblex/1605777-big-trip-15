import AbstractView from './abstract';

const listEmptyContainer = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class ListEmpty extends AbstractView {
  getTemplate() {
    return listEmptyContainer();
  }
}
