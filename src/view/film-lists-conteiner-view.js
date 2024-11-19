import AbstractView from '../framework/view/abstract-view';

const createFilmListConteinerTemplete = () => '<div class="films-list__container"></div>';

export default class FilmListConteinerView extends AbstractView {
  get template() {
    return createFilmListConteinerTemplete();
  }
}
