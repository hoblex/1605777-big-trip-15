import dayjs from 'dayjs';
import AbstractView from './abstract';

const DATE_FORMAT_STRING = 'DD/MM/YY HH:mm';
const formatDay = (date)=>date.format(DATE_FORMAT_STRING);

const FORM_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Transport',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const xchecked = (value, current)=>value===current?'checked':'';
const createEventTypeCheckboxTemplate = (typesList, pointType, selectedType = pointType) => (typesList.map((item) => `<div class="event__type-item">
                <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${xchecked(item.toLowerCase(), selectedType)}>
                <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
            </div>`).join(''));

const createAdditionalOptionsTemplate = (optionList, pointType, selectedType = pointType) => {
  selectedType = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
  if (optionList.has(selectedType)) {
    const offers  = optionList.get(selectedType);
    return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${offers.map(([offerName, offerCost, offerChecked]) =>
    `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${offerChecked ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${offerName}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offerCost}</span>
            </label>
          </div>`,
  ).join('')}
    </div>
    </section>`;
  } else {
    return '';
  }
};

const createPhotosTemplate = (photoList) => (
  photoList.map((item) => `<img class="event__photo" src="${item}" alt="Event photo">`).join('')
);

const createPointForm = (data = {}) => {
  const {
    pointType = 'Taxi',
    city = '',
    time = {timeBegin: dayjs(), timeEnd:dayjs()},
    additionalOptions = new Map(),
    photoList = new Array(0),
    description = new Array(0),
    selectedType = pointType,
    selectedCity = city,
  } = data;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${selectedType.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeCheckboxTemplate(FORM_TYPES, pointType, selectedType)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${selectedType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedCity}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDay(time.timeBegin)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDay(time.timeEnd)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${createAdditionalOptionsTemplate(additionalOptions, pointType, selectedType)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createPhotosTemplate(photoList)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`;
};

export default class PointForm extends AbstractView {
  constructor(point) {
    super();
    this._data = PointForm.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._selectTypeToggleHandler = this._selectTypeToggleHandler.bind(this);
    this._selectCityToggleHandler = this._selectCityToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(
      PointForm.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointForm(this._data);
  }

  _selectTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      selectedType: evt.target.value,
    });
  }

  _selectCityToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      selectedCity: evt.target.value,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    // this._callback.formSubmit();
    this._callback.formSubmit(PointForm.parseDataToPoint(this._data));
  }

  updateData(update) {
    this._data = Object.assign(
      {},
      this._data,
      update,
    );
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormClickCloseHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('input', this._selectTypeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._selectCityToggleHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormClickCloseHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formSubmitHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        selectedType: point.pointType,
        selectedCity: point.city,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    data.pointType = data.selectedType;
    data.city = data.selectedCity;

    delete data.selectedType;
    delete  data.selectedCity;

    return data;
  }
}
