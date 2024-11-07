import { createElement } from '../render.js';
import { convertRunTime, dateComment, fullDateRealeaseFilm } from '../util.js';

const createFilmPopupTemplete = ({ filmInfo }, comments) => {
  const { title, poster, ageRating, alternativetitle, totalRating, director, writers,
    actors, release, runtime, genre, description
  } = filmInfo;
  const dateReales = fullDateRealeaseFilm(release.date);
  const timeMovie = convertRunTime(runtime);

  const containerGenres = document.createElement('td');
  containerGenres.className = 'film-details__cell';

  genre.forEach((element) => {
    const itemContainer = document.createElement('template');
    itemContainer.innerHTML = `<span class="film-details__genre">${element}</span>`;
    containerGenres.append(itemContainer.content);
  });

  const list = document.createElement('ul');
  list.className = 'film-details__comments-list';

  comments.forEach((item) => {
    const { author, comment, date, emotion } = item;
    const dateUserCom = dateComment(date);
    const itemList = document.createElement('template');

    itemList.innerHTML = [`<li class="film-details__comment">
    <span class="film-details__comment-emoji">
    <img src="../images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${dateUserCom}</span>
    <button class="film-details__comment-delete">Delete</button>
    </p>
    </div>
    </li>`].join('\n');

    list.append(itemList.content);
  });

  return [`<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
    <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
    <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}">

    <p class="film-details__age">${ageRating}</p>
    </div>

    <div class="film-details__info">
    <div class="film-details__info-head">
    <div class="film-details__title-wrap">
    <h3 class="film-details__title">${title}</h3>
    <p class="film-details__title-original">${alternativetitle}</p>
    </div>

    <div class="film-details__rating">
    <p class="film-details__total-rating">${totalRating}</p>
    </div>
    </div>

    <table class="film-details__table">
    <tr class="film-details__row">
    <td class="film-details__term">Director</td>
    <td class="film-details__cell">${director}</td>
    </tr>
    <tr class="film-details__row">
    <td class="film-details__term">Writers</td>
    <td class="film-details__cell">${writers}</td>
    </tr>
    <tr class="film-details__row">
    <td class="film-details__term">Actors</td>
    <td class="film-details__cell">${actors}</td>
    </tr>
    <tr class="film-details__row">
    <td class="film-details__term">Release Date</td>
    <td class="film-details__cell">${dateReales}</td>
    </tr>
    <tr class="film-details__row">
    <td class="film-details__term">Runtime</td>
    <td class="film-details__cell">${timeMovie}</td>
    </tr>
    <tr class="film-details__row">
    <td class="film-details__term">Country</td>
    <td class="film-details__cell">${release.releaseCountry}</td>
    </tr>
    <tr class="film-details__row">
    <td class="film-details__term">Genres</td>
    ${containerGenres.outerHTML}
    </tr>
    </table>

    <p class="film-details__film-description">${description}</p>
    </div>
    </div>

    <section class="film-details__controls">
    <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
    </div>

    <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  
    ${list.outerHTML}

    <div class="film-details__new-comment">
    <div class="film-details__add-emoji-label"></div>

    <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">',
    <label class="film-details__emoji-label" for="emoji-sleeping">
    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
    <label class="film-details__emoji-label" for="emoji-puke">
    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
    </div>
    </div>
    </section>
    </div>
    </form>
    </section>`].join('\n');
};

export default class FilmPopupView {
  #element = null;
  #film = null;
  #comments = null;

  constructor(film, comments) {
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmPopupTemplete(this.#film, this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
