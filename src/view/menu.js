import AbstractView from './abstract';
import { MenuItem } from './const';

// const switchClassName = isActive
//   ? 'trip-tabs__btn  trip-tabs__btn--active'
//   : 'trip-tabs__btn';

const createMenuTemplate = () =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
  </nav>`;

export default class Menu extends AbstractView {
  constructor () {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
    // this._currentMenu = currentMenu;
  }

  getTemplate() {
    return createMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.textContent);
  }

  setMenuClickHandler(callback) {
    // debugger;
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('.trip-tabs__btn');
    for (const item of items) {
      if(item.textContent === menuItem) {
        item.classList.add('trip-tabs__btn--active');
      }
      else {
        item.classList.remove('trip-tabs__btn--active');
      }
    }
  }
}
