import AbstractView from '../framework/view/abstract-view';

const createFilterListTemplate = () => `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class FilterListView extends AbstractView {
  #buttonSort = null;

  get template() {
    return createFilterListTemplate();
  }

  setBtnSortClickHandler = (callback) => {
    this._callback.btnSortClick = callback;
    this.element
      .querySelectorAll('.sort__button')
      .forEach((btnSort) => {
        btnSort.addEventListener('click', () => {
          this.#getNoActive();
          btnSort.classList.add('sort__button--active');
          this.#buttonSort = btnSort.textContent;
          this._callback.btnSortClick();
        });
      });
  };

  #getNoActive() {
    this.element.querySelectorAll('.sort__button').forEach((btn) => {
      btn.classList.remove('sort__button--active');
    });
  }

  get = () => this.#buttonSort;

}
