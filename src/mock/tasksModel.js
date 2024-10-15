import { generateTask, generateComment } from './data.js';

const films = Array.from({length: 5}, generateTask);

const comments = films.map((film) => {
  const lengthComments = film.comments.length;
  return Array.from({length: lengthComments}, () => generateComment());
});


console.log('films: ', films);
console.log('comments: ', comments);
