function app(state,output,dispatch){
 append(view(state), output);
 

 R.compose(
  append(view(state)),
  clear()
 )(output);

const stop = dispatch((e) => {
 stop();
 const newText = getText();
 const newState = [
  ...state, 
  newText
 ];

 setText('');
 app(newState,output,dispatch)
});
}

function view(state){
 const tag = element('div');


 return state.length > 0 ? R.pipe( 
  ...state.map((content,index) => append(contains(content,index)))
 )(element('div')) : tag;
}

function contains(content,index){
 return R.compose(
  append(messege(content)),
  addClass('todo'),
  attr('id', index)
 )(element('div'));
}

const buttonClick = on('click', getId('button'));

app(
 Object.freeze([]),
 getId('list'),
 buttonClick
);
