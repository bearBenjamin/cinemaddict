import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardDescriptionView from '../view/film-card-descriptions -view.js';
import { render } from '../render.js';
import FilmListConteinerView from '../view/film-lists-conteiner-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmListExtraView from '../view/film-list-extra-view.js';
import FilmPopupView from '../view/film-popup-view.js';

//const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

export default class FilmCardPresenter {
  #container = null;
  #taskModel = null;
  #films = null;
  #comments = null;
  #popupFilm = null;

  #film = new FilmsView();
  #filmList = new FilmListView();
  #filmListConteiner = new FilmListConteinerView();
  //filmCardDescriptions = new FilmCardDescriptionView();
  #filmShowMore = new FilmShowMoreView();
  #filmListExtraTop = new FilmListExtraView();
  #filmListExtraMessage = new FilmListExtraView();
  #filmListExtraTopConteiner = new FilmListConteinerView();
  #filmListExtraMessageConteiner = new FilmListConteinerView();

  init = (container, taskModel) => {
    this.#container = container;
    this.#taskModel = taskModel;
    this.#films = [...this.#taskModel.films];
    this.#comments = [...this.#taskModel.comments];

    render(this.#film, this.#container);
    render(this.#filmList, this.#film.element);
    render(this.#filmListConteiner, this.#filmList.element);

    for (let i = 0; i < this.#films.length; i += 1) {
      this.#renderCardFilm(this.#films[i], this.#comments[i]);
    }

    render(this.#filmShowMore, this.#filmList.element);

    render(this.#filmListExtraTop, this.#film.element);
    render(this.#filmListExtraTopConteiner, this.#filmListExtraTop.element);

    for (let i = 0; i < FILM_EXTRA_COUNT; i += 1) {
      render(new FilmCardDescriptionView(this.#films[i]), this.#filmListExtraTopConteiner.element);
    }

    render(this.#filmListExtraMessage, this.#film.element);
    render(this.#filmListExtraMessageConteiner, this.#filmListExtraMessage.element);

    for (let i = 0; i < FILM_EXTRA_COUNT; i += 1) {
      render(new FilmCardDescriptionView(this.#films[i]), this.#filmListExtraMessageConteiner.element);
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

  #replacePopupFilm =() => {
    this.#container.removeChild(this.#popupFilm.element);
    this.#popupFilm = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeydown = (evt) => {
    if  (evt.key === 'Escape' || evt.key === 'Esc') {
      //evt.preventDefault();
      this.#replacePopupFilm();
    }
  };
}
