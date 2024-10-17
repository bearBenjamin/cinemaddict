import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(lower + Math.random() * (upper - lower + 1));
  return result;
};

const getRandomNumFloat = (min, max) => {
  const number = Math.random() * (max - min) + min; // Максимум не включается, минимум включается
  const result = number.toFixed(1);
  return result;
};

const getRandomItemArray = (item) => {
  const index = getRandomInteger(0, item.length - 1);
  const result = item[index];
  return result;
};

const textTruncate = (str, length = 140, ending = '...') => {
  const result = str.substring(0, (length - ending.length)) + ending;
  return result;
};

const convertRunTime = (number) => {
  let remeinder = number;
  let count = 0;
  while (remeinder > 60) {
    remeinder = remeinder - 60;
    count = count + 1;
  }
  const result = `${count}h ${remeinder}m`;
  return result;
};

const dateYearRealeaseFilm = (date) => dayjs(date).format('YYYY');
const fullDateRealeaseFilm = (data) => dayjs(data).format('DD MMMM YYYY');
const dateComment = (data) => dayjs(data).format('YYYY/MM/DD HH[:]MM');


export {getRandomInteger, getRandomNumFloat, getRandomItemArray, dateYearRealeaseFilm, fullDateRealeaseFilm, textTruncate, dateComment, convertRunTime};
