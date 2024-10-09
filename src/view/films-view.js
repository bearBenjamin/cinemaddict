import { createElement } from '../render.js';

const createFilmsTemplete = () => '<section class="films"> </section>';

export default class FilmsView {
  getTemplate () {
    return createFilmsTemplete();
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
