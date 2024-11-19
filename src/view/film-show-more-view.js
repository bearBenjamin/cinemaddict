import AbstractView from '../framework/view/abstract-view';

const createFilmShowMoreTemplete = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmShowMoreView extends AbstractView {
  get template() {
    return createFilmShowMoreTemplete();
  }
}
