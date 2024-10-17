import { generateTask, generateComment } from './data.js';

export default class TaskModel {
  films = Array.from({length: 5}, generateTask);

  getFilms = () => this.films;

  comments = this.films.map((film) => {
    const lengthComments = film.comments.length;
    const result = Array.from({length: lengthComments}, () => generateComment());
    return result;
  });

  getComments = () => this.comments;
}

