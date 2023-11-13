import * as dark from './modules/toggle-dark-mode.js';
import * as favBtns from './modules/favorites-add-remove.js';
import * as favsToggle from './modules/favorites-show-hide.js';
import * as backToTop from './modules/back-to-top.js';

document.addEventListener('DOMContentLoaded', () => {
  dark.init();
  favBtns.init();
  favsToggle.init();
  backToTop.init();
});
