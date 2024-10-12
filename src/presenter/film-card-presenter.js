import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardDescriptionView from '../view/film-card-descriptions -view.js';
//import { container } from 'webpack';
import { render } from '../render.js';
import FilmListConteinerView from '../view/film-lists-conteiner-view.js';
import FilmShowMoreView from '../view/film-show-more-view.js';
import FilmListExtraView from '../view/film-list-extra-view.js';
import FilmPopupView from '../view/film-popup-view.js';

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

export default class FilmCardPresenter {
  film = new FilmsView();
  filmList = new FilmListView();
  filmListConteiner = new FilmListConteinerView();
  filmCardDescriptions = new FilmCardDescriptionView();
  filmShowMore = new FilmShowMoreView();
  filmListExtraTop = new FilmListExtraView();
  filmListExtraMessage = new FilmListExtraView();
  filmListExtraTopConteiner = new FilmListConteinerView();
  filmListExtraMessageConteiner = new FilmListConteinerView();

  init = (container) => {
    this.container = container;

    render(this.film, this.container);
    render(this.filmList, this.film.getElement());
    render(this.filmListConteiner, this.filmList.getElement());

    for (let i = 0; i < FILM_COUNT; i += 1) {
      render(new FilmCardDescriptionView(), this.filmListConteiner.getElement());
    }

    render(this.filmShowMore, this.filmList.getElement());

    render(this.filmListExtraTop, this.film.getElement());
    render(this.filmListExtraTopConteiner, this.filmListExtraTop.getElement());

    for (let i = 0; i < FILM_EXTRA_COUNT; i += 1) {
      render(new FilmCardDescriptionView(), this.filmListExtraTopConteiner.getElement());
    }

    render(this.filmListExtraMessage, this.film.getElement());
    render(this.filmListExtraMessageConteiner, this.filmListExtraMessage.getElement());

    for (let i = 0; i < FILM_EXTRA_COUNT; i += 1) {
      render(new FilmCardDescriptionView(), this.filmListExtraMessageConteiner.getElement());
    }

    render(new FilmPopupView(), this.container.parentElement);
  };
}
