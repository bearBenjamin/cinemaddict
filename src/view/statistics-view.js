import AbstractView from '../framework/view/abstract-view';
import { getNumberFilmsAll } from '../utils/filter';

const createStatisticsTemplate = (films) => {
  const allFilms = getNumberFilmsAll(films);
  return `<p>${allFilms} movies inside</p>`;
};

export default class StatisticsView extends AbstractView {
  #films = null;

  constructor (taskFilms) {
    super();
    this.#films = [...taskFilms.get()];
  }

  get template() {
    return createStatisticsTemplate(this.#films);
  }
}
