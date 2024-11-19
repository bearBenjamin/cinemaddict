import AbstractView from '../framework/view/abstract-view';

const createFilmListExtraTemplete = () => `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  </section>`;

export default class FilmListExtraTopView extends AbstractView {
  get template() {
    return createFilmListExtraTemplete();
  }
}
