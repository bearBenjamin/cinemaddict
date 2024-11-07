import { createElement } from '../render.js';

const createFilmListTemplete = () => ['<section class="films-list">',
  '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>',
  '</section>'].join('\n');

export default class FilmListView {
  #element = null;

  get template() {
    return createFilmListTemplete();
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.element = null;
  }
}
