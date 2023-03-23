import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './_reducers';
import ReduxThunk from 'redux-thunk';
// import promiseMiddleware from 'redux-promise-middleware';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from '@redux-devtools/extension';

//const store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk, promiseMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware, ReduxThunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
