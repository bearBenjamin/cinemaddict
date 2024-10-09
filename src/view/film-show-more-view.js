import { createElement } from '../render.js';

const createFilmShowMoreTemplete = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmShowMoreView {
  getTemplate () {
    return createFilmShowMoreTemplete();
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
