import { generateFilm } from '../mock/data.js';

export default class FilmsModel {
  #films = Array.from({length: 23}, generateFilm);

  get = () => this.#films;
}
