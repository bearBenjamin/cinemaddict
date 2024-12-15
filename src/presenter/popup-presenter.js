import { render, remove, replace } from '../framework/render';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  #film = null;
  #comments = null;
  #popupFilm = null;
  #mainConteiner = null;
  #changeData = null;
  #replacePopupFilm = null;
  #onEscKeydown = null;

  constructor (mainConteiner, changeData, replacePopupFilm, onEscKeydown) {
    this.#mainConteiner = mainConteiner;
    this.#changeData = changeData;
    this.#replacePopupFilm = replacePopupFilm;
    this.#onEscKeydown = onEscKeydown;
  }

  init(film, comment) {
    this.#film = film;
    this.#comments = comment;

    const prevPopup = this.#popupFilm;

    this.#popupFilm = new FilmPopupView(this.#film, this.#comments);

    this.#mainConteiner.appendChild(this.#popupFilm.element);

    this.#popupFilm.setBtnClosePopupClickHandler (() => {
      this.#replacePopupFilm();
      document.removeEventListener('keydown', this.#onEscKeydown);
    });


    this.#popupFilm.setBtnWatchlistPopupClickHandler (() => {
      this.#changeData({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        }
      });
    });

    this.#popupFilm.setBtnWatchedPopupClickHandler (() => {
      this.#changeData({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched
        }
      });
    });

    this.#popupFilm.setBtnFavoritePopupClickHandler (() => {
      this.#changeData({
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite
        }
      });
    });

    if (prevPopup === null) {
      render (this.#popupFilm, this.#mainConteiner);
      return;
    }

    replace (this.#popupFilm, prevPopup);
  }

  destroy = () => {
    remove(this.#popupFilm);
  };
}
