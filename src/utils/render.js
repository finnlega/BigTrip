import Abstract from '../view/abstract';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, child, place) => {
  if(container instanceof Abstract) {
    container = container.getElement();
  }

  if(child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;

    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  if(oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (companent) => {
  if(companent === null) {
    return;
  }

  if(!(companent instanceof Abstract)) {
    throw new Error('Can remove only companent');
  }

  companent.getElement().remove();
  companent.removeElement();
};

