import { createElement } from '../render.js';

const createFilmListExtraTemplete = () => ['<section class="films-list films-list--extra">',
  '<h2 class="films-list__title">Most commented</h2>',
  '</section>'].join('\n');

export default class FilmListExtraView {
  getTemplate () {
    return createFilmListExtraTemplete();
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
