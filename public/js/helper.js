// Creates a new DOM element of the given tag
const element = tag => document.createElement(tag);

// Retrieves an element by its ID
const getId = id => document.getElementById(id);

// Creates a text node with the provided content
const messege = node => document.createTextNode(node);

// Retrieves the value of an element with ID 'input'
const getText = () => getId('input').value;

// Sets the value of an element with ID 'input'
const setText = value => (getId('input').value = value);

// Curried function: Appends a node to an element and returns the element
const append = R.curry(function (node, element) {
  element.appendChild(node);
  return element;
});

// Curried function: Adds a class to an element and returns the element
const addClass = R.curry(function (className, element) {
  element.classList.add(className);
  return element;
});

// Curried function: Sets an attribute on an element and returns the element
const attr = R.curry(function (attributeName, attributeValue, element) {
  element.setAttribute(attributeName, attributeValue);
  return element;
});

// Curried function: Clears the inner HTML of an element and returns the element
const clear = R.curry(function (element) {
  element.innerHTML = '';
  return element;
});

// Curried function: Adds an event listener to an element and returns a function to remove the listener
const on = R.curry(function (eventType, element, fn) {
  element.addEventListener(eventType, fn);
  // Returns a function that removes the added event listener
  return function () {
    element.removeEventListener(eventType, fn);
  };
});

// Example usage:
// const div = element('div');
// const list = getId('list');
// append(div, list);
// const removeClickListener = on('click', div, () => console.log('Clicked'));
// removeClickListener(); // Removes the click event listener
