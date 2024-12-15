import ProfileUserView from './view/header-profile-user-view.js';
import StatisticsView from './view/statistics-view.js';
import NavigationView from './view/navigation-view.js';
import FilmCardPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comment-model.js';

import { generateComments } from './mock/data.js';
import { render, RenderPosition } from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

const modelFilms = new FilmsModel();
const comments = generateComments(modelFilms.get());
const modelComments = new CommentsModel(comments);

const filmCardPresenter = new FilmCardPresenter(siteMainElement, modelFilms, modelComments);

render (new ProfileUserView(modelFilms), siteHeaderElement);
render (new StatisticsView(modelFilms), siteFooterStatistics);
render (new NavigationView(modelFilms), siteMainElement, RenderPosition.AFTERBEGIN);

filmCardPresenter.init();
