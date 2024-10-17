import { getRandomInteger, getRandomItemArray, getRandomNumFloat } from '../util.js';

const ID = ['0', '1', '2', '3', '4', '5'];

const TITLE = [
  'A Little Pony Without The Carpet',
  'Made for Each other', 'Popeye meets Sinbad',
  'Sagebrush trail', 'Santa Claus coquers the martaians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm'
];

const ALTERNATIVE_TITLE = [
  'А зори здесь тихие',
  'Семнадцать мгновений весны',
  'Ошибка резидента',
  'Старики-разбойники',
  'Любовь и голуби',
  'Возвращение'
];

const POSTERS = ['images/posters/made-for-each-other.png', 'images/posters/popeye-meets-sinbad.png', 'images/posters/sagebrush-trail.jpg', 'images/posters/santa-claus-conquers-the-martians.jpg', 'images/posters/the-dance-of-life.jpg', 'images/posters/the-great-flamarion.jpg', 'images/posters/the-man-with-the-golden-arm.jpg' ];
const AGE_RATING = ['0', '12+', '16+', '18+'];
const DIRECTOR = ['Tom Ford', 'Федор Бондарчук'];
const WRITERS = ['Takehi Kitano', 'Сергей Минаев'];
const ACTORS = ['Morgan Freeman', 'Сергей Бурунов'];
const RELEASE_COUNTRY = ['Finland', 'Use', 'Russia', 'China', 'Swedia', 'Spain'];
const GENRE = [['Comedy'], ['Drama', 'Thriller'], ['Action movie'], ['Horor', 'Comedy', 'Action movie']];

const DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget. 
  Fusce tristique felis at fermentum pharetra. 
  Aliquam id orci ut lectus varius viverra. 
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. 
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. 
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. 
  Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. 
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const getIdComments = () => {
  const hasComments = getRandomInteger();
  const length = getRandomInteger(1, 4);
  const idComments = [];

  if (hasComments) {
    for (let i = 0; i < length; i += 1) {
      idComments.push(getRandomInteger(1, 100));
    }
  }

  return idComments;
};

export const generateTask = () => ({
  id: getRandomItemArray(ID),
  comments: getIdComments(),
  filmInfo: {
    title: getRandomItemArray(TITLE),
    alternativetitle: getRandomItemArray(ALTERNATIVE_TITLE),
    totalRating: getRandomNumFloat(1, 10),
    poster: getRandomItemArray(POSTERS),
    ageRating: getRandomItemArray(AGE_RATING),
    director: getRandomItemArray(DIRECTOR),
    writers: [
      WRITERS.join(', ')
    ],
    actors: [
      ACTORS.join(', ')
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: getRandomItemArray(RELEASE_COUNTRY)
    },
    runtime: getRandomInteger(0, 300),
    genre: [
      ...getRandomItemArray(GENRE)
    ],
    description: getRandomItemArray(DESCRIPTION).replace(/(\r\n|\n|\r)/gm, '')
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',//null
    favorite: false
  }
});

const AUTHOR = ['Ilya O\'Reily', 'Andrye Petrov', 'Irina Solovei', 'Angry Berd', 'Pruff', 'Zlo', 'Dobro', '555', 'Krasiva'];

const COMMENT = [
  'a film that changed my life, a true masterpriece, post-credit scene was just amazing omg.',
  'Только мне показалось, что концовка затянута?',
  'А где разврат?',
  'Какое хорошее кина. Побольше бы таких!',
  'Вау! Я влюбился в главную героиню',
  'Режиссера на мыло!',
  'Петров опять сыграл самого себя. Как же это все задолбало!'
];

const EMOTION = ['smile', 'sleeping', 'puke', 'angry'];

export const generateComment = () => ({
  id: getRandomInteger(1, 100),
  author: getRandomItemArray(AUTHOR),
  comment: getRandomItemArray(COMMENT),
  date: '2019-05-11T16:12:32.554Z', //null
  emotion: getRandomItemArray(EMOTION)
});

