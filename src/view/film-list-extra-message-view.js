import AbstractView from '../framework/view/abstract-view';

const createFilmListExtraTemplete = () => `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  </section>`;

export default class FilmListExtraMessageView extends AbstractView {
  get template() {
    return createFilmListExtraTemplete();
  }
}
