import Abstract from './abstract';
export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataupdating) {
    if(!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if(justDataupdating) {
      return;
    }
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parentElement = prevElement.parentElement;

    this.removeElement();
    const newElement = this.getElement();
    parentElement.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
