export default class CommentsModel {
  #comments = null;

  constructor (comments) {
    this.#comments = comments;
  }

  get () {
    return this.#comments;
  }
}
