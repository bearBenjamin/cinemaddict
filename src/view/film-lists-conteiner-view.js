import { createElement } from '../render.js';

const createFilmListConteinerTemplete = () => '<div class="films-list__container"></div>';

export default class FilmListConteinerView {
  getTemplate () {
    return createFilmListConteinerTemplete();
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
