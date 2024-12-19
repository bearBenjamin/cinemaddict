import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmListConteinerView from '../view/film-lists-conteiner-view.js';

import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';

import SortListView from '../view/sort-list-view.js';

import FilmListExtraTopView from '../view/film-list-extra-top-view.js';
import FilmListExtraMessageView from '../view/film-list-extra-message-view.js';

import CardFilmPresenter from './film-presenter.js';
import TopCardFilmPresenter from './top-film-presenter.js';
import FilmPopupPresenter from './popup-presenter.js';
import MostCommentedPresenter from './most-comented-film-presenter.js';

import { render, remove } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { toggleSortFilms, sortFilmsDate, sortFilmsRating, sortFilmsComments } from '../utils/sort.js';
import { DEFAULT_FILM_EXTRA, DEFAULT_FILM_SHOW } from '../utils/const.js';


export default class FilmCardPresenter {
  #films = null;
  #comments = null;
  #сontainer = null;
  #modelFilms = null;
  #modelComments = null;
  #showFilms = null;
  #selectedFilm = null;

  #currentSort = null;
  #filmSort = null;
  #sortFilmListDefault = null;

  #film = new FilmsView();
  #filmList = new FilmListView();
  #filmListConteiner = new FilmListConteinerView();

  #filmShowMoreButton = new FilmShowMoreView();
  #filmListEmptyView = new FilmListEmptyView();

  #filmListExtraTop = new FilmListExtraTopView();
  #filmListExtraMessage = new FilmListExtraMessageView();
  #filmListExtraTopConteiner = new FilmListConteinerView();
  #filmListExtraMessageConteiner = new FilmListConteinerView();

  #cardFilmPresenter = new Map();
  #topFilmsPresenter = new Map();
  #mostMessagePresenter = new Map();
  #popupFilmPresenter = null;

  #filmCount = DEFAULT_FILM_SHOW;
  #extraFilmCount = DEFAULT_FILM_EXTRA;

  constructor(container, modelFilms, modelComments) {
    this.#сontainer = container;
    this.#modelFilms = modelFilms;
    this.#modelComments = modelComments;
  }

  init = () => {
    this.#films = [...this.#modelFilms.get()];
    this.#comments = [...this.#modelComments.get()];

    this.#renderSort();

    this.#renderFilm();
    this.#renderFilmList();
    this.#renderFilmListConteiner();

    this.#renderFilms();

    this.#renderTopRatedFilms();

    this.#renderMostCommentedFilms();

  };

  #renderFilms() {

    if (this.#films.length === 0) {
      this.#renderFilmListEmpty();
      return;
    }

    this.#renderShowElements(0, Math.min(this.#films.length, this.#filmCount));

    if (this.#films.length > DEFAULT_FILM_SHOW) {
      this.#renderFilmShowMore();
    }

  }

  #btnShowMoreFilmsHandler = () => {
    this.#renderShowElements(this.#filmCount, this.#filmCount + DEFAULT_FILM_SHOW);

    this.#filmCount += DEFAULT_FILM_SHOW;

    if (this.#filmCount >= this.#films.length) {
      remove(this.#filmShowMoreButton);
    }
  };

  #filmChangeHandler = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);

    if (this.#cardFilmPresenter.has(updatedFilm.id)) {
      this.#cardFilmPresenter.get(updatedFilm.id).init(updatedFilm);

      if (this.#popupFilmPresenter && this.#selectedFilm.id === updatedFilm.id) {
        this.#selectedFilm = updatedFilm;
        this.#renderPopupCardFilm();
      }
    }

    if (this.#topFilmsPresenter.has(updatedFilm.id)) {
      this.#topFilmsPresenter.get(updatedFilm.id).init(updatedFilm);

      if (this.#popupFilmPresenter && this.#selectedFilm.id === updatedFilm.id) {
        this.#selectedFilm = updatedFilm;
        this.#renderPopupCardFilm();
      }
    }

    if (this.#mostMessagePresenter.has(updatedFilm.id)) {
      this.#mostMessagePresenter.get(updatedFilm.id).init(updatedFilm);

      if (this.#popupFilmPresenter && this.#selectedFilm.id === updatedFilm.id) {
        this.#selectedFilm = updatedFilm;
        this.#renderPopupCardFilm();
      }
    }
  };


  //метод по отрисовке заданного количества карточек на странице(по умолчанию у меня показывается 5 карточек);
  //после нажатия на кнопку ShowMore плюс 5 новых карточек
  #renderShowElements(from, to) {
    this.#showFilms = this.#films.slice(from, to);

    for (let i = 0; i < DEFAULT_FILM_SHOW; i += 1) {
      if (this.#showFilms[i]) {
        this.#renderCardFilm(this.#showFilms[i]);
      }
    }
  }

  #renderCardFilm(film, comment) {
    const cardFilm = new CardFilmPresenter(
      this.#filmListConteiner.element,
      this.#filmChangeHandler,
      this.#addPopupFilm,
      this.#onEscKeydown);

    cardFilm.init(film, comment);
    this.#cardFilmPresenter.set(film.id, cardFilm);
  }

  #clearFilmListConteiner() {
    this.#cardFilmPresenter.forEach((presenter) => {
      presenter.destroy();
    });
    this.#cardFilmPresenter.clear();
    this.#filmCount = DEFAULT_FILM_SHOW;
    remove(this.#filmShowMoreButton);
  }

  #addPopupFilm = (film) => {
    this.#selectedFilm = film;
    this.#renderPopupCardFilm();
    document.body.classList.add('hide-overflow');
  };

  #renderPopupCardFilm() {
    const comments = [];
    this.#comments.forEach((items) => {
      items.forEach((item) => {
        if (item.id === this.#selectedFilm.id) {
          comments.push(item);
        }
      });
    });

    if (!this.#popupFilmPresenter) {
      this.#popupFilmPresenter = new FilmPopupPresenter(
        this.#сontainer,
        this.#filmChangeHandler,
        this.#replacePopupFilm,
        this.#onEscKeydown
      );
    }
    this.#popupFilmPresenter.init(this.#selectedFilm, comments);
  }

  #replacePopupFilm = () => {
    this.#popupFilmPresenter.destroy();
    this.#popupFilmPresenter = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePopupFilm();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  };

  #renderSort() {
    if (this.#films.length === 0) {
      return;
    }

    this.#filmSort = new SortListView();

    this.#filmSort.setBtnSortClickHandler(() => {
      this.#sortFilmListDefault = [...this.#modelFilms.get()];

      this.#currentSort = this.#filmSort.get();

      switch (this.#currentSort) {
        case 'Sort by default':
          toggleSortFilms(this.#currentSort);
          this.#films = this.#sortFilmListDefault;
          break;

        case 'Sort by date':
          toggleSortFilms(this.#currentSort);
          this.#films = sortFilmsDate(this.#films);
          break;

        case 'Sort by rating':
          toggleSortFilms(this.#currentSort);
          this.#films = sortFilmsRating(this.#films);
          break;
      }

      this.#clearFilmListConteiner();
      this.#renderFilms();
    });

    render(this.#filmSort, this.#сontainer);
  }


  #renderFilm() {
    render(this.#film, this.#сontainer);
  }

  #renderFilmList() {
    render(this.#filmList, this.#film.element);
  }

  #renderFilmListConteiner() {
    render(this.#filmListConteiner, this.#filmList.element);
  }

  #renderFilmListEmpty() {
    render(this.#filmListEmptyView, this.#filmListConteiner.element);
  }

  #renderFilmShowMore() {
    render(this.#filmShowMoreButton, this.#filmList.element);

    this.#filmShowMoreButton.setClickHandler(this.#btnShowMoreFilmsHandler);
  }

  #renderTopRatedFilms() {

    if (this.#films.length === 0) {
      return;
    }

    this.#renderFilmListExtraTop();
    this.#renderFilmListExtraTopConteiner();

    this.#films = sortFilmsRating(this.#films);

    for (let i = 0; i < this.#extraFilmCount; i += 1) {
      this.#renderTopCardFilm(this.#films[i]);
    }
  }

  #renderTopCardFilm(film) {
    const topCardFilm = new TopCardFilmPresenter(
      this.#filmListExtraTopConteiner.element,
      this.#filmChangeHandler,
      this.#addPopupFilm,
      this.#onEscKeydown);

    topCardFilm.init(film);
    this.#topFilmsPresenter.set(film.id, topCardFilm);
  }

  #renderMostCommentedFilms() {

    if (this.#films.length === 0) {
      return;
    }

    this.#renderFilmListExtraMessage();
    this.#renderFilmListExtraMessageConteiner();

    this.#films = sortFilmsComments(this.#films);

    for (let i = 0; i < this.#extraFilmCount; i += 1) {
      this.#renderMostCommentedCardFilm(this.#films[i]);
    }
  }

  #renderMostCommentedCardFilm(film) {
    const mostCommentedCardFilm = new MostCommentedPresenter(
      this.#filmListExtraMessageConteiner.element,
      this.#filmChangeHandler,
      this.#addPopupFilm,
      this.#onEscKeydown);

    mostCommentedCardFilm.init(film);
    this.#mostMessagePresenter.set(film.id, mostCommentedCardFilm);
  }

  #renderFilmListExtraTop() {
    render(this.#filmListExtraTop, this.#film.element);
  }

  #renderFilmListExtraTopConteiner() {
    render(this.#filmListExtraTopConteiner, this.#filmListExtraTop.element);
  }

  #renderFilmListExtraMessage() {
    render(this.#filmListExtraMessage, this.#film.element);
  }

  #renderFilmListExtraMessageConteiner() {
    render(this.#filmListExtraMessageConteiner, this.#filmListExtraMessage.element);
  }

}
