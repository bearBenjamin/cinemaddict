import FilmCardDescriptionView from '../view/film-card-descriptions-view';
import { render, remove, replace } from '../framework/render';

export default class CardFilmPresenter {
  #film = null;
  #cardFilm = null;
  #listContainer = null;
  #changeDate = null;
  #addPopupFilm = null;
  #onEscKeydown = null;

  constructor (listContainer, changeDate, addPopupFilm, onEscKeydown) {
    this.#listContainer = listContainer;
    this.#changeDate = changeDate;
    this.#addPopupFilm = addPopupFilm;
    this.#onEscKeydown = onEscKeydown;
  }

  init (film) {
    this.#film = film;
    const prevCardFilm = this.#cardFilm;

    this.#cardFilm = new FilmCardDescriptionView(this.#film);

    this.#cardFilm.setCardFilmClickHandler(() => {
      this.#addPopupFilm(this.#film);
      document.addEventListener('keydown',this.#onEscKeydown);
    });

    this.#cardFilm.setBtnAddCardFilmClickHandler(() => {
      this.#changeDate({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        }
      });
    });

    this.#cardFilm.setBtnWatchedCardFilmClickHandler(() => {
      this.#changeDate({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched
        }
      });
    });

    this.#cardFilm.setBthFavoriteCardFilmClickHandler(() => {
      this.#changeDate({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite
        }
      });
    });

    if (prevCardFilm === null) {
      render (this.#cardFilm, this.#listContainer);
      return;
    }

    if (this.#listContainer.contains(prevCardFilm.element)) {
      replace (this.#cardFilm, prevCardFilm);
    }

    remove(prevCardFilm);
  }

  destroy = () => {
    remove(this.#cardFilm);
  };

}
