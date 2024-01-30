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
    // debugger;
    const prevElement = this.getElement();
    const parentElement = prevElement.parentElement;
    // console.log('prevElement', prevElement);
    // console.log('parentElement', parentElement);
    this.removeElement();
    const newElement = this.getElement();
    // console.log('newElement', newElement);

    parentElement.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
