import { generateFilms } from '../mock/data.js';

export default class FilmsModel {
  #films = generateFilms();

  get = () => this.#films;
}
