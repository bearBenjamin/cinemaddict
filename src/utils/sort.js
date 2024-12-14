const sortFilmsDate = (films) => {

  if (films.length <= 1) {
    return films;
  }

  const pivotIndex = Math.floor(films.length / 2);
  const pivotItem = films[pivotIndex].filmInfo.release.date;
  const less = [];
  const greater = [];

  for (let i = 0; i < films.length; i += 1) {

    if (i === pivotIndex) {
      continue;
    }

    if (films[i].filmInfo.release.date.getTime() < pivotItem.getTime()) {
      less.push(films[i]);
    } else {
      greater.push(films[i]);
    }

  }

  return [...sortFilmsDate(greater), films[pivotIndex], ...sortFilmsDate(less)];
};

const sortFilmsRating = (films) => {

  if (films.length <= 1) {
    return films;
  }

  const pivotIndex = Math.floor(films.length / 2);
  const pivotItem = films[pivotIndex].filmInfo.totalRating;

  const less = [];
  const greater = [];

  for (let i = 0; i < films.length; i += 1) {

    if (i === pivotIndex) {
      continue;
    }

    if (Number(films[i].filmInfo.totalRating) < Number(pivotItem)) {
      less.push(films[i]);
    } else {
      greater.push(films[i]);
    }

  }

  return [...sortFilmsRating(greater), films[pivotIndex], ...sortFilmsRating(less)];
};

// const sortFilmButtons = {
//   'Sort by default': 'off',
//   'Sort by date': 'off',
//   'Sort by rating': 'off',
// };

const toggleSortFilms = (nameSort) => {
  const sortFilmButtons = {
    'Sort by default': 'off',
    'Sort by date': 'off',
    'Sort by rating': 'off',
  };

  if (sortFilmButtons[nameSort] === 'on') {
    return;
  }

  switch(nameSort) {
    case 'Sort by default' :
      sortFilmButtons['Sort by default'] = 'on';
      sortFilmButtons['Sort by date'] = 'off';
      sortFilmButtons['Sort by rating'] = 'off';
      break;

    case 'Sort by date' :
      sortFilmButtons['Sort by date'] = 'on';
      sortFilmButtons['Sort by default'] = 'off';
      sortFilmButtons['Sort by rating'] = 'off';
      break;

    case 'Sort by rating' :
      sortFilmButtons['Sort by rating'] = 'on';
      sortFilmButtons['Sort by date'] = 'off';
      sortFilmButtons['Sort by default'] = 'off';
      break;
  }
};

export { toggleSortFilms, sortFilmsDate, sortFilmsRating };
