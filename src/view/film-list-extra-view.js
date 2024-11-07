import { createElement } from '../render.js';

const createFilmListExtraTemplete = () => ['<section class="films-list films-list--extra">',
  '<h2 class="films-list__title">Most commented</h2>',
  '</section>'].join('\n');

export default class FilmListExtraView {
  #element = null;

  get template() {
    return createFilmListExtraTemplete();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
