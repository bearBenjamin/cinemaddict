import AbstractView from '../framework/view/abstract-view.js';
import { convertRunTime, dateYearRealeaseFilm, textTruncate } from '../utils/task.js';

const createFilmCardDescriptionTemplete = ({ comments, filmInfo, userDetails }) => {
  const { watchlist, alreadyWatched, favorite } = userDetails;
  const userDetailsTemplate = `
  <div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : 'film-card__controls-item'}" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : 'film-card__controls-item'}" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : 'film-card__controls-item'}" type="button">Mark as favorite</button>
  </div>`;

  const { title, totalRating, release, runtime, genre, poster, description, } = filmInfo;
  const date = release.date === null ? '' : dateYearRealeaseFilm(release.date);
  const timeMovie = convertRunTime(runtime);
  const truncatedDescription = textTruncate(description);
  const numberComment = comments.length;
  const filmInfoTemplate = `
  <a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${totalRating}</p>
  <p class="film-card__info">
  <span class="film-card__year">${date}</span>
  <span class="film-card__duration">${timeMovie}</span>
  <span class="film-card__genre">${genre}</span>
  </p>
  <img src=${poster} alt="" class="film-card__poster">
  <p class="film-card__description">${truncatedDescription}</p>
  <span class="film-card__comments">${numberComment} comments</span>
  </a>`;

  return `<article class="film-card">
    ${filmInfoTemplate}
    ${userDetailsTemplate}
  </article>`;
};

export default class FilmCardDescriptionView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardDescriptionTemplete(this.#film);
  }

  setCardFilmClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('a').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setCardFilmBtnAddClickHandler = (callback) => {
    this._callback.clickBtnAdd = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#clickBtnAddHandler);
  };

  #clickBtnAddHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickBtnAdd();
  };

  setCardFilmBtnWatchedClickHandler = (callback) => {
    this._callback.clickBtnWatched= callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#clickBtnWatchedHandler);
  };

  #clickBtnWatchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickBtnWatched();
  };

  setCardFilmBthFavoriteClickHandler = (callback) => {
    this._callback.clickBtnFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#clickBtnFavoriteHandler);
  };

  #clickBtnFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickBtnFavorite();
  };
}
