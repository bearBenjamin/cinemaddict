//import TaskModel from './mock/tasksModel.js';
import ProfileUserView from './view/header-profile-user-view.js';
import StatisticsView from './view/statistics-view.js';
import NavigationView from './view/navigation-view.js';
import FilmCardPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import {RenderPosition} from './framework/render.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comment-model.js';
import { generateComments } from './mock/data.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

//const taskModel = new TaskModel();
const taskFilms = new FilmsModel();
const comments = generateComments(taskFilms.get());
const taskComments = new CommentsModel(comments);

const filmCardPresenter = new FilmCardPresenter(siteMainElement, taskFilms, taskComments);

render (new ProfileUserView(taskFilms), siteHeaderElement);
render (new StatisticsView(taskFilms), siteFooterStatistics);
render (new NavigationView(taskFilms), siteMainElement, RenderPosition.AFTERBEGIN);

filmCardPresenter.init();
