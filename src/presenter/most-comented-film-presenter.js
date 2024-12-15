import FilmCardDescriptionView from '../view/film-card-descriptions-view.js';
import { render, replace, remove } from '../framework/render.js';

export default class MostCommentedPresenter {
  #film = null;
  #mostCommentedCardFilm = null;
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

    const prevMostCommentedCardFilm = this.#mostCommentedCardFilm;

    this.#mostCommentedCardFilm = new FilmCardDescriptionView(this.#film);


    this.#mostCommentedCardFilm.setCardFilmClickHandler(() => {
      this.#addPopupFilm(film);
      document.addEventListener('keydown',this.#onEscKeydown);
    });

    this.#mostCommentedCardFilm.setBtnAddCardFilmClickHandler(() => {
      this.#changeDate({
        ...film,
        userDetails: {
          ...film.userDetails,
          watchlist: !film.userDetails.watchlist
        }
      });
    });

    this.#mostCommentedCardFilm.setBtnWatchedCardFilmClickHandler(() => {
      this.#changeDate({
        ...film,
        userDetails: {
          ...film.userDetails,
          alreadyWatched: !film.userDetails.alreadyWatched
        }
      });
    });

    this.#mostCommentedCardFilm.setBthFavoriteCardFilmClickHandler(() => {
      this.#changeDate({
        ...film,
        userDetails: {
          ...film.userDetails,
          favorite: film.userDetails.favorite
        }
      });
    });

    if (prevMostCommentedCardFilm === null) {
      render(this.#mostCommentedCardFilm, this.#conteiner);
      return;
    }

    if (this.#conteiner.contains(prevMostCommentedCardFilm.element)) {
      replace(this.#mostCommentedCardFilm, prevMostCommentedCardFilm);
    }

    remove(prevMostCommentedCardFilm);
  }

  destroy = () => {
    remove(this.#mostCommentedCardFilm);
  };
}
