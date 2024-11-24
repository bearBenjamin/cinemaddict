const getNumberWatchlist = (films) => {
  const watchlists = films.filter((film) => film.userDetails.watchlist === true);
  const quantityFilms = watchlists.length;
  return quantityFilms;
};

const getNumberHistory = (films) => {
  const moviesWatched = films.filter((film) => film.userDetails.alreadyWatched === true);
  const quantityFilms = moviesWatched.length;
  return quantityFilms;
};

const getNumberFavorite = (films) => {
  const favoriteFilms = films.filter((film) => film.userDetails.favorite === true);
  const quantityFilms = favoriteFilms.length;
  return quantityFilms;
};

const getNumberFilmsAll = (films) => films.length;

const getStatusUser = (films) => {
  const numberFilm = getNumberHistory(films);

  if (numberFilm >= 1 && numberFilm <= 10) {
    const status = 'novice';
    return status;
  }

  if (numberFilm > 10 && numberFilm <= 20) {
    const status = 'fan';
    return status;
  }

  if (numberFilm > 21) {
    const status = 'movie buff';
    return status;
  }

  const noStatus = '';
  return noStatus;
};

export { getNumberWatchlist, getNumberHistory, getNumberFavorite, getNumberFilmsAll, getStatusUser };
