const parentElements = (element) => {
  const parents = [];
  while (element) {
    const tagName = element.nodeName.toLowerCase();
    const cssId = element.id ? `#${element.id}` : '';
    const cssClass = element.className ? `.${element.className.replace(/\s+/g, '.')}` : '';

    parents.unshift({
      element,
      selector: tagName + cssId + cssClass,
    });

    element = element.parentNode !== document ? element.parentNode : false;
  }

  return parents;
};

const nthElement = (element) => {
  let c = element;
  let nth = 0;
  while (c.previousElementSibling !== null) {
    if (c.nodeName === element.nodeName) {
      nth++;
    }
    c = c.previousElementSibling;
  }

  return nth;
};

const nthSelectorNeeded = (selector, path) => {
  const querySelector = path === '' ? selector : `${path} > ${selector}`;

  return document.querySelectorAll(querySelector).length > 1;
};

const buildPathString = (parents) => {
  const pathArr = [];

  for (const parent of parents) {
    if (nthSelectorNeeded(parent.selector, pathArr.join(' > '))) {
      parent.selector += `:nth-of-type(${nthElement(parent.element)})`;
    }
    pathArr.push(parent.selector);
  }

  return pathArr.join(' > ');
};

const domElementPath = element => {
  if (!(element instanceof HTMLElement)) {
    throw "element must be of type `HTMLElement`.";
  };

  return buildPathString(parentElements(element));
};

export default domElementPath;