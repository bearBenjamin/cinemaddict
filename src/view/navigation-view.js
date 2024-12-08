import AbstractView from '../framework/view/abstract-view';
import { getNumberFavorite, getNumberHistory, getNumberWatchlist } from '../mock/filter';

const createNavigationTemplete = (films) => {
  const quantityFilmsWatchlist = getNumberWatchlist(films);
  const quantityFilmsHistory = getNumberHistory(films);
  const quantityFilmsFavorite = getNumberFavorite(films);

  return  `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${quantityFilmsWatchlist}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${quantityFilmsHistory}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${quantityFilmsFavorite}</span></a>
  </nav>`;
};

export default class NavigationView extends AbstractView {
  #films = null;

  constructor (taskFilms) {
    super();
    this.#films = [...taskFilms.get()];
  }

  get template() {
    return createNavigationTemplete(this.#films);
  }
}
