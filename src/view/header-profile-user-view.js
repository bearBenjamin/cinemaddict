import AbstractView from '../framework/view/abstract-view';
import { getStatusUser } from '../mock/filter';

const createProfileUserTemplate = (films) => {
  const status = getStatusUser(films);

  return `<section class="header__profile profile">
  <p class="profile__rating">${status}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileUserView extends AbstractView {
  #films = null;

  constructor (taskFilms) {
    super();
    this.#films = [...taskFilms.get()];
  }

  get template() {
    return createProfileUserTemplate(this.#films);
  }
}
