import { createElement } from '../render.js';

const createFilmButtonsTemplete = () => ['<div class="film-card__controls">',
  '<button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>',
  '<button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>',
  '<button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>',
  '</div>'].join('\n');

export default class FilmButtonsView {
  getTemplate () {
    return createFilmButtonsTemplete();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
