import { createElement } from '../render.js';

const createFilmListConteinerTemplete = () => '<div class="films-list__container"></div>';

export default class FilmListConteinerView {
  #element = null;

  get template() {
    return createFilmListConteinerTemplete();
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
