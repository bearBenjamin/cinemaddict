import TaskModel from './mock/tasksModel.js';
import ProfileUserView from './view/header-profile-user-view.js';
import StatisticsView from './view/statistics-view.js';
import NavigationView from './view/navigation-view.js';
import FilterListView from './view/filter-list-view.js';
import FilmCardPresenter from './presenter/film-card-presenter.js';
import { render } from './framework/render.js';
import {RenderPosition} from './framework/render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

const taskModel = new TaskModel();
const filmCardPresenter = new FilmCardPresenter(siteMainElement, taskModel);

render (new ProfileUserView(taskModel), siteHeaderElement);
render (new StatisticsView(taskModel), siteFooterStatistics);
render (new NavigationView(taskModel), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterListView(), siteMainElement);

filmCardPresenter.init();
