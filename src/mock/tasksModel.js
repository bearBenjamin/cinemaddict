import { generateFilms, generateComments } from './data.js';

export default class TaskModel {
  #films = generateFilms();

  get films() {
    return this.#films;
  }

  #comments = generateComments(this.#films);

  get comments() {
    return this.#comments;
  }
}
