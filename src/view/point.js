import AbstractView from './abstract';
import {BLANK_POINT} from '../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const createOfferContainer = (optionsList, type) => {
  if (!optionsList.has(type)) {
    return '';
  } else {
    const offers = optionsList.get(type);
    return `<ul class="event__selected-offers">
    ${offers.map(([offerName, offerPrice]) =>  `<li class="event__offer">
       <span class="event__offer-title">${offerName}</span>
       &plus;&euro;&nbsp;
       <span class="event__offer-price">${offerPrice}</span>
     </li>`).join('')}
  </ul>`;
  }
};

const generateTimeDuration = (time) => {
  const {timeBegin , timeEnd} = time;
  const timeDuration = dayjs.duration(timeEnd.diff(timeBegin));
  return timeDuration;
};

const createTripPoint = (point = BLANK_POINT) => {
  const {
    pointType,
    city,
    time,
    pointCost: pointCost,
    additionalOptions,
    isFavorite,
  } = point;

  time.timeDuration = generateTimeDuration(time);
  const favoriteClassName = isFavorite ?
    'event__favorite-btn--active' :
    '';

  const getEventTimeDuration = () => {
    if (time.timeDuration !== null) {
      const eventTimeDuration = time.timeDuration.hours() === 0 ?
        `${time.timeDuration.minutes()}M` :
        `${time.timeDuration.hours()}H ${ time.timeDuration.minutes()}M`;
      console.log(time.timeDuration);
      return eventTimeDuration;
    } else {
      return '0M';
    }
  };


  return `<li class="trip-events__item">
    <div class="event">
    <time class="event__date" datetime="${time.timeBegin.format('YYYY-MM-DD')}">${time.timeBegin.format('D MMM')}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${pointType} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${time.timeBegin.format('YYYY-MM-DD')}T${time.timeBegin.format('H:mm')}">${time.timeBegin.format('H:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${time.timeEnd.format('YYYY-MM-DD')}T${time.timeEnd.format('H:mm')}">${time.timeEnd.format('H:mm')}</time>
      </p>
      <p class="event__duration">${getEventTimeDuration()}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${pointCost}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createOfferContainer(additionalOptions, pointType)}
    <button class="event__favorite-btn  ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._formOpenClickHandler = this._formOpenClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPoint(this._point);
  }

  _formOpenClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFormClickOpenHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formOpenClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-icon').addEventListener('click', this._favoriteClickHandler);
  }
}
