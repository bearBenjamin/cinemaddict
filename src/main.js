import TaskModel from './mock/tasksModel.js';
import ProfileUserView from './view/header-profile-user-view.js';
import StatisticsView from './view/statistics-view.js';
import NavigationView from './view/navigation-view.js';
import FilterListView from './view/filter-list-view.js';
import FilmCardPresenter from './presenter/films-presenter.js';
import { render } from './framework/render.js';
import {RenderPosition} from './framework/render.js';
//import { SITE_MAIN_ELEMENT } from './mock/const.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');

const taskModel = new TaskModel();
const filmCardPresenter = new FilmCardPresenter(/*SITE_MAIN_ELEMENT*/ siteMainElement, taskModel);

render (new ProfileUserView(taskModel), siteHeaderElement);
render (new StatisticsView(taskModel), siteFooterStatistics);
render (new NavigationView(taskModel), /*SITE_MAIN_ELEMENT*/siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilterListView(), /*SITE_MAIN_ELEMENT*/siteMainElement);

filmCardPresenter.init();

/*Можно ли заменить const siteMainElement = document.querySelector('.main') на
const SITE_MAIN_ELEMENT = document.querySelector('.main') и все другие аналогичные константы
разместив их в отдельном модуле CONST.js и оттуда их импортировать в другие модули? Или это
приведет к тому что в какой то момент потеряется связь между константой и контекстом, и она
превратится в некий MagicElement?*/
