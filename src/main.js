import ProfileUserView from './view/header-profile-user-view.js';
import StatisticsView from './view/statistics-view.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');

const siteFooterElement = document.querySelector('.footer');
const siteFooterStatistics = siteFooterElement.querySelector('.footer__statistics');


render (new ProfileUserView(), siteHeaderElement);
render (new StatisticsView(), siteFooterStatistics);
