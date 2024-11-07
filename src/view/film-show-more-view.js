import { createElement } from '../render.js';

const createFilmShowMoreTemplete = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmShowMoreView {
  #element = null;

  get template() {
    return createFilmShowMoreTemplete();
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
