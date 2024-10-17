import TaskModel from './mock/tasksModel.js';
import ProfileUserView from './view/header-profile-user-view.js';
import StatisticsView from './view/statistics-view.js';
import NavigationView from './view/navigation-view.js';
import FilterListView from './view/filter-list-view.js';
import FilmCardPresenter from './presenter/film-card-presenter.js';
import {render} from './render.js';
import {RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

const taskModel = new TaskModel();

render (new ProfileUserView(), siteHeaderElement);
render (new StatisticsView(), siteFooterStatistics);
render (new NavigationView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterListView, siteMainElement);

const filmCardPresenter = new FilmCardPresenter();
filmCardPresenter.init(siteMainElement, taskModel);
