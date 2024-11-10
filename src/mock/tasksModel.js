import { generateTask, generateComment } from './data.js';

export default class TaskModel {
  #films = Array.from({length: 6}, generateTask);

  get films() {
    return this.#films;
  }

  #comments = this.#films.map((film) => {
    const lengthComments = film.comments.length;
    const result = Array.from({length: lengthComments}, () => generateComment());
    return result;
  });

  get comments() {
    return this.#comments;
  }
}

