import FilmsView from '../view/films-view.js';
import FilmListView from '../view/film-list-view.js';
import FilmCardDescriptionView from '../view/film-card-descriptions -view.js';
//import { container } from 'webpack';
import { render } from '../render.js';

export default class FilmCardPresenter {
  film = new FilmsView();
  filmList = new FilmListView();
  filmCardDescriptions = new FilmCardDescriptionView();

  init = (container) => {
    this.container = container;

    render(this.film, this.container);
    render(this.filmList, this.film.getElement());
    render(this.filmCardDescriptions, this.filmList.getElement());
  };
}
