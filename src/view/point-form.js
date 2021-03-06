import dayjs from 'dayjs';
import SmartView from './smart';
import flatpickr from 'flatpickr';
import {BLANK_POINT, FORM_TYPES} from '../const';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createCitiesList = (list) => (Array.from(list.keys()).map((item) => `<option value="${item}"></option>`)).join('');
const createCitiesPattern = (list) => (Array.from(list.keys()).map((item) => `${item}`)).join('|');

const xchecked = (value, current)=>value===current?'checked':'';
const xdelete = (state)=> state ? 'Deleting...' : 'Delete';
const createEventTypeCheckboxTemplate = (typesList, pointType, selectedType = pointType) => (typesList.map((item) => `<div class="event__type-item">
                <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${xchecked(item.toLowerCase(), selectedType)}>
                <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
            </div>`).join(''));

const createAdditionalOptionsTemplate = (optionsList, choosedAdditionalOptions) => (
  `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${optionsList.map((item) => {
    const offerName = item.title;
    const offerCost= item.price;
    return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.title.replace(/[^A-Z0-9]+/ig, '-').toLowerCase()}-${item.price}-1" type="checkbox" name="event-offer-${item.title.replace(/[^A-Z0-9]+/ig, '-').toLowerCase()}-${item.price}-1" ${choosedAdditionalOptions.some((elem) => (item.title === elem.title) && (item.price === elem.price)) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${item.title.replace(/[^A-Z0-9]+/ig, '-').toLowerCase()}-${item.price}-1">
            <span class="event__offer-title">${offerName}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offerCost}</span>
          </label>
        </div>`;
  }).join('')}
    </div>
    </section>`
);

const createPhotosTemplate = (photoList) => {
  if (photoList) {
    return photoList.pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join('');
  } else {
    return '';
  }
};

const createPointForm = (data = {}, fullDescriptionsList = new Map(), fullOffersList = new Map()) => {
  const {
    pointType = 'taxi',
    city = '',
    time = {timeBegin: dayjs(), timeEnd:dayjs()},
    additionalOptions = [],
    pointCost,
    selectedType = pointType,
    selectedCity = city,
    isSaving,
    isDeleting,
  } = data;

  const fullAdditionalOptionsList = fullOffersList;
  const fullDestinationsDescriptionList = fullDescriptionsList;

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedCity}" minlength = 1 list="destination-list-1" pattern="${createCitiesPattern(fullDestinationsDescriptionList)}">
        <datalist id="destination-list-1">
        ${createCitiesList(fullDestinationsDescriptionList)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${time.timeBegin}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${time.timeEnd}">
      </div>


      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min = 0 value="${pointCost}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">${city === '' ? 'Cancel' : xdelete(isDeleting)}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${createAdditionalOptionsTemplate(fullAdditionalOptionsList.get(selectedType), additionalOptions)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${selectedCity !== '' ? fullDestinationsDescriptionList.get(selectedCity).description : ''}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createPhotosTemplate(fullDestinationsDescriptionList.get(selectedCity))}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`;
};

export default class PointForm extends SmartView {
  constructor(descriptionsList, offersList, point = BLANK_POINT) {
    super();
    this._data = PointForm.parsePointToData(point);
    this._datepicker = null;
    this._additionOptions = this._data.additionalOptions;
    this._fullDestinationsDescriptionList = descriptionsList;
    this._fullOffersList = offersList;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._timeBeginChangeHandler = this._timeBeginChangeHandler.bind(this);
    this._timeEndChangeHandler = this._timeEndChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._selectPointTypeInputHandler = this._selectPointTypeInputHandler.bind(this);
    this._selectCityInputHandler = this._selectCityInputHandler.bind(this);
    this._selectPriceInputHandler = this._selectPriceInputHandler.bind(this);
    this._selectedCityEnterKeyDownHandler = this._selectedCityEnterKeyDownHandler.bind(this);
    this._selectedCityFocusOutHandler = this._selectedCityFocusOutHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(point) {
    this.updateData(
      PointForm.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointForm(this._data, this._fullDestinationsDescriptionList, this._fullOffersList);
  }

  _setActualOffersStorage() {
    const fullOfferList = this._fullOffersList;
    const typeFullOfferList = this._fullOffersList.get(this._data.selectedType).slice();
    const actualOffers = this._additionOptions.slice();
    const actualOffersTypeStorage = typeFullOfferList.map((item) => (actualOffers.some((elem) => (item.title === elem.title) && (item.price === elem.price))) ? item : null);
    return {fullOfferList, typeFullOfferList, actualOffersTypeStorage};
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.time.timeBegin.toISOString(),
        onChange: this._timeBeginChangeHandler,
        maxDate: this._data.time.timeEnd.toISOString(),
      },
    );

    this._datepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.time.timeEnd.toISOString(),
        onChange: this._timeEndChangeHandler,
        minDate: this._data.time.timeBegin.toISOString(),
      },
    );
  }

  _timeBeginChangeHandler([userDate]) {
    this.updateData({
      time: Object.assign(
        {},
        this._data.time,
        {timeBegin: dayjs(userDate), timeDuration: dayjs.duration((this._data.time.timeEnd).diff(dayjs(userDate)))},
      ),
    });
  }

  _timeEndChangeHandler([userDate]) {
    this.updateData({
      time: Object.assign({}, this._data.time, {timeEnd: dayjs(userDate)}),
    });
  }

  _selectPointTypeInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      selectedType: evt.target.value,
      additionalOptions: [],
    });
  }

  _selectCityInputHandler(evt) {
    evt.preventDefault();
    if (this._fullDestinationsDescriptionList.has(evt.target.value)) {
      this.updateData({
        selectedCity: evt.target.value,
      }, true);
    }
  }

  _selectPriceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      pointCost: evt.target.value,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointForm.parseDataToPoint(this._data));
  }

  _formCloseClickHandler (evt) {
    evt.preventDefault();
    this._callback.formCloseClick();
  }

  _selectedCityEnterKeyDownHandler (evt) {
    if (evt.key === 'Enter' || evt.keyCode === 13) {
      evt.preventDefault();
    }
  }

  _selectedCityFocusOutHandler (evt) {
    evt.preventDefault();
    if (this._fullDestinationsDescriptionList.has(evt.target.value)) {
      this.updateData({
        city: evt.target.value,
        destination: Object.assign(
          {},
          {name: evt.target.value,
            description: this._fullDestinationsDescriptionList.get(evt.target.value).description,
            pictures: this._fullDestinationsDescriptionList.get(evt.target.value).pictures,
          },
        ),
      });
    } else {
      this.updateData({
        pointCity: '',
      });
    }
  }

  createAdditionOptionsHandlers (offerStorage) {
    const additionOptionsSelectors = Array.from(this.getElement().querySelectorAll('.event__offer-checkbox'));
    additionOptionsSelectors.forEach((item) => item.addEventListener('input', (evt) => {
      const selectedIndex = additionOptionsSelectors.indexOf(evt.target);
      offerStorage.actualOffersTypeStorage[selectedIndex] === null ?
        offerStorage.actualOffersTypeStorage[selectedIndex] = offerStorage.typeFullOfferList[selectedIndex] :
        offerStorage.actualOffersTypeStorage[selectedIndex] = null;

      const actualAdditionalOptions = offerStorage.actualOffersTypeStorage.filter((elem) => elem !== null);

      evt.preventDefault();
      this.updateData({
        additionalOptions: actualAdditionalOptions,
      }, true);
    }));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setFormCloseClickHandler(this._callback.formCloseClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('input', this._selectPointTypeInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('input', this._selectCityInputHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('change', this._selectPriceInputHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('keydown', this._selectedCityEnterKeyDownHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('focusout', this._selectedCityFocusOutHandler);
    this.createAdditionOptionsHandlers(this._setActualOffersStorage());
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setFormCloseClickHandler(callback) {
    this._callback.formCloseClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseClickHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointForm.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        selectedType: point.pointType,
        selectedCity: point.city,
        pointCost: point.pointCost,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    data.pointType = data.selectedType;
    data.city = data.selectedCity;

    delete data.selectedType;
    delete data.selectedCity;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
