import { render, remove, replace } from '../framework/render';
import FilmCardDescriptionView from '../view/film-card-descriptions-view.js';

export default class TopCardFilmPresenter {
  #film = null;
  #topCardFilm = null;
  #conteiner = null;
  #changeDate = null;
  #addPopupFilm = null;
  #onEscKeydown = null;


  constructor (conteiner, changeDate, addPopupFilm, onEscKeydown) {
    this.#conteiner = conteiner;
    this.#changeDate = changeDate;
    this.#addPopupFilm = addPopupFilm;
    this.#onEscKeydown = onEscKeydown;
  }

  init (film) {
    this.#film = film;

    const prevTopCardFilm = this.#topCardFilm;

    this.#topCardFilm = new FilmCardDescriptionView(this.#film);

    this.#topCardFilm.setCardFilmClickHandler(() => {
      this.#addPopupFilm(this.#film);
      document.addEventListener('keydown',this.#onEscKeydown);
    });

    this.#topCardFilm.setBtnAddCardFilmClickHandler(() => {
      this.#changeDate({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        }
      });
    });

    this.#topCardFilm.setBtnWatchedCardFilmClickHandler(() => {
      this.#changeDate({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched
        }
      });
    });

    this.#topCardFilm.setBthFavoriteCardFilmClickHandler(() => {
      this.#changeDate({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite
        }
      });
    });

    if (prevTopCardFilm === null) {
      render(this.#topCardFilm, this.#conteiner);
      return;
    }

    if (this.#conteiner.contains(prevTopCardFilm.element)) {
      replace (this.#topCardFilm, prevTopCardFilm);
    }

    remove(prevTopCardFilm);
  }

  destroy = () => {
    remove(this.#topCardFilm);
  };
}
