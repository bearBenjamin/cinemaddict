import AbstractView from '../framework/view/abstract-view';
import { getNumberFilmsAll } from '../mock/filter';

const createStatisticsTemplate = (films) => {
  const allFilms = getNumberFilmsAll(films);
  return `<p>${allFilms} movies inside</p>`;
};

export default class StatisticsView extends AbstractView {
  #taskModel = null;
  #films = null;

  constructor (taskModel) {
    super();
    this.#taskModel = taskModel;
    this.#films = [...this.#taskModel.films];
  }

  get template() {
    return createStatisticsTemplate(this.#films);
  }
}
