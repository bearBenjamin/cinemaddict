import { generateFilm, generateComment } from './data.js';

export default class TaskModel {
  #films = Array.from({length: 23}, generateFilm);

  get films() {
    return this.#films;
  }

  #comments = this.#films.map((film) => {
    const lengthComments = film.comments.length;
    const idComment = film.id;
    const result = Array.from({length: lengthComments}, () => generateComment(idComment));
    return result;
  });

  get comments() {
    return this.#comments;
  }
}
