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
    // console.log(update);
    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    // console.log('prevElem', prevElement);
    const parentElement = prevElement.parentElement;

    this.removeElement();
    const newElement = this.getElement();
    // console.log('newElem', newElement);
    parentElement.replaceChild(newElement, prevElement);
    // console.log(this._data);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
