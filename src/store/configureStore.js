import { createStore } from 'redux';

/*
    Creates a Redux store that holds the complete state tree of your app.
    There should only be a single store in your app.
    http://redux.js.org/docs/api/createStore.html
*/

const reducer = () => {};
const preloadedState = {};

export default () => {
  const store = createStore(reducer, preloadedState,

    /*
      DevTools for Redux with actions history, undo and replay.
      https://github.com/zalmoxisus/redux-devtools-extension
    */

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}