import { createElement } from '../render.js';

const createFilmListExtraTemplete = () => `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  </section>`;

export default class FilmListExtraTopView {
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
