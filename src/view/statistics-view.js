import {createElement} from '../render.js';

const createStatisticsTemplate = () => ' <p>130 291 movies inside</p>';

export default class StatisticsView {
  #element = null;

  get template() {
    return createStatisticsTemplate();
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
