import { createElement } from '../render.js';
import { convertRunTime, dateYearRealeaseFilm, textTruncate } from '../util.js';

const createFilmCardDescriptionTemplete = ({ comments, filmInfo }) =>{
  const { title, totalRating, release, runtime, genre, poster, description, } = filmInfo;
  const date = release.date === null ? '' : dateYearRealeaseFilm(release.date);
  const timeMovie = convertRunTime(runtime);
  const truncatedDescription = textTruncate(description);
  const numberComment = comments.length;

  return `<article class="film-card">
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
    </a>
    <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
    </div>
    </article>`;
};

export default class FilmCardDescriptionView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardDescriptionTemplete(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
