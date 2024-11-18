import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardDescriptionView from '../view/film-card-descriptions -view.js';
import { render } from '../render.js';
import FilmListConteinerView from '../view/film-lists-conteiner-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmListExtraTopView from '../view/film-list-extra-top-view.js';
import FilmListExtraMessageView from '../view/film-list-extra-message-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';

const FILM_EXTRA_COUNT = 2;
const DEFAULT_FILM_SHOW = 5;

export default class FilmCardPresenter {
  #container = null;
  #taskModel = null;
  #films = null;
  #comments = null;
  #popupFilm = null;

  #film = new FilmsView();
  #filmList = new FilmListView();
  #filmListConteiner = new FilmListConteinerView();
  #filmShowMore = new FilmShowMoreView();
  #filmLisEmptyView = new FilmListEmptyView();
  #filmListExtraTop = new FilmListExtraTopView();
  #filmListExtraMessage = new FilmListExtraMessageView();
  #filmListExtraTopConteiner = new FilmListConteinerView();
  #filmListExtraMessageConteiner = new FilmListConteinerView();

  #renderFilmCount = DEFAULT_FILM_SHOW;

  constructor(container, taskModel) {
    this.#container = container;
    this.#taskModel = taskModel;
  }

  init = () => {

    this.#films = [...this.#taskModel.films];
    this.#comments = [...this.#taskModel.comments];

    this.#renderFilms();

    this.#renderTopRatedFilms();

    this.#renderMostCommentedFilms();

  };

  #renderFilms () {

    render(this.#film, this.#container);
    render(this.#filmList, this.#film.element);
    render(this.#filmListConteiner, this.#filmList.element);

    if (this.#films.length === 0) {
      render(this.#filmLisEmptyView, this.#filmListConteiner.element);
      return;
    }

    for (let i = 0; i < Math.min(this.#films.length, this.#renderFilmCount); i += 1) {
      this.#renderCardFilm(this.#films[i], this.#comments[i]);
    }

    if (this.#films.length > DEFAULT_FILM_SHOW) {
      render(this.#filmShowMore, this.#filmList.element);

      this.#filmShowMore.element.addEventListener('click', this.#handlerLoadShowMoreFilms);
    }

  }

  #handlerLoadShowMoreFilms = (evt) => {
    evt.preventDefault();
    const films = this.#films.slice(this.#renderFilmCount, this.#renderFilmCount + DEFAULT_FILM_SHOW);
    const comments = this.#comments.slice(this.#renderFilmCount, this.#renderFilmCount + DEFAULT_FILM_SHOW);
    for (let i = 0; i < DEFAULT_FILM_SHOW; i += 1) {
      if (films[i] !== undefined) {
        this.#renderCardFilm(films[i], comments[i]);
      }
    }

    this.#renderFilmCount += DEFAULT_FILM_SHOW;

    if (this.#renderFilmCount >= this.#films.length) {
      this.#filmShowMore.element.remove();
      this.#filmShowMore.removeElement();
    }

  };

  #renderCardFilm (film, comment) {
    const cardFilm = new FilmCardDescriptionView(film);
    const cardFilmElement = cardFilm.element.querySelector('a');

    cardFilmElement.addEventListener('click', () => {
      this.#addPopupFilm(film, comment);
      document.addEventListener('keydown',this.#onEscKeydown);
    });

    render(cardFilm, this.#filmListConteiner.element);
  }

  #addPopupFilm (film, comment) {
    this.#renderPopupCardFilm(film, comment);
    document.body.classList.add('hide-overflow');
  }

  #renderPopupCardFilm (film, comment) {
    this.#popupFilm = new FilmPopupView(film, comment);

    this.#container.appendChild(this.#popupFilm.element);

    const closePopupFilmElement = this.#popupFilm.element.querySelector('.film-details__close-btn');

    closePopupFilmElement.addEventListener('click', () => {
      this.#replacePopupFilm();
      document.removeEventListener('keydown', this.#onEscKeydown);
    });
  }

  #replacePopupFilm() {
    this.#container.removeChild(this.#popupFilm.element);
    this.#popupFilm = null;
    document.body.classList.remove('hide-overflow');
  }

  #onEscKeydown = (evt) => {
    if  (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePopupFilm();
    }
  };

  #renderTopRatedFilms () {
    render(this.#filmListExtraTop, this.#film.element);
    render(this.#filmListExtraTopConteiner, this.#filmListExtraTop.element);

    for (let i = 0; i < FILM_EXTRA_COUNT; i += 1) {
      render(new FilmCardDescriptionView(this.#films[i]), this.#filmListExtraTopConteiner.element);
    }
  }

  #renderMostCommentedFilms () {
    render(this.#filmListExtraMessage, this.#film.element);
    render(this.#filmListExtraMessageConteiner, this.#filmListExtraMessage.element);

    for (let i = 0; i < FILM_EXTRA_COUNT; i += 1) {
      render(new FilmCardDescriptionView(this.#films[i]), this.#filmListExtraMessageConteiner.element);
    }
  }

}
