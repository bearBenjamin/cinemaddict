import dayjs from 'dayjs';

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

export {dateYearRealeaseFilm, fullDateRealeaseFilm, textTruncate, dateComment, convertRunTime};
