
const buttonClick = on('click', getId('button'));

function app(state, output, dispatch) {
  append(view(state), output);

  R.compose(
    append(view(state)),
    clear()
  )(output);

  const stop = dispatch((e) => {
    stop();

    const newTitle = getTitle();
    const newText = getText();
    const newState = [
      ...state,
      { title: newTitle, body: newText } 
    ];

    setTitle('');
    setText('');
    app(newState, output, dispatch);
    saveStateToLocalStorage(newState); 
  });
}

function view(state) {
 const tag = element('div');

 return state.length > 0
   ? R.pipe(
       ...state.map((content, index) => append(contains(content, index)))
     )(element('div'))
   : tag;
}

function contains(content, index) {
 const blogDiv = element('div');
 addClass('blog', blogDiv);
 attr('data-index', index, blogDiv);

 const titleDiv = element('div');
 addClass('title', titleDiv);
 append(message(content.title), titleDiv);

 const bodyDiv = element('div');
 addClass('body', bodyDiv);

 // Splitting text content into lines
 const lines = content.body.split('\n');
 lines.forEach((line, idx) => {
   append(message(line), bodyDiv); // Append each line as a separate text node in the body div
   if (idx < lines.length - 1) {
     append(element('br'), bodyDiv); // Add <br> after each line except the last one
   }
 });

 const buttonDiv = element('button');
 addClass('btn', buttonDiv);
 append(message(''), buttonDiv);

 // Event listener for the delete button
 buttonDiv.addEventListener('click', () => {
   const parent = buttonDiv.parentNode;
   const indexToRemove = parseInt(parent.getAttribute('data-index'));
   let currentState = loadStateFromLocalStorage();
   currentState = currentState.filter((_, idx) => idx !== indexToRemove);
   saveStateToLocalStorage(currentState);
   parent.remove();
 });


 append(buttonDiv, blogDiv);
 append(titleDiv, blogDiv);
 append(bodyDiv, blogDiv);


 return blogDiv;
}

// Load state from Local Storage
function loadStateFromLocalStorage() {
  const storedState = localStorage.getItem('blogState');
  return storedState ? JSON.parse(storedState) : [];
}

// Save state to Local Storage
function saveStateToLocalStorage(state) {
  localStorage.setItem('blogState', JSON.stringify(state));
}


let currentState = loadStateFromLocalStorage();
app(currentState, getId('list'), buttonClick);


document.addEventListener('click', (e) => {
 if (e.target.classList.contains('btn')) {
   const postId = e.target.getAttribute('data-id');
   let currentState = loadStateFromLocalStorage();
   currentState = currentState.filter((_, index) => index !== parseInt(postId));
   e.target.parentNode.remove();
 }
});

