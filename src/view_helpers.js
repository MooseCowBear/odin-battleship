/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
export function addElement(
  type,
  parent,
  classes,
  textContent = "",
  options = {}
) {
  const elem = document.createElement(type);
  parent.appendChild(elem);
  elem.classList.add(...classes);

  if (textContent) elem.textContent = textContent;

  for (const o in options) {
    elem.setAttribute(o, options[o]);
  }

  return elem;
}

export function addImage(src, parent, classes = [], options = {}) {
  const image = new Image();
  image.src = src;
  image.classList.add(...classes);
  parent.appendChild(image);

  for (const o in options) {
    image.setAttribute(o, options[o]);
  }
}
