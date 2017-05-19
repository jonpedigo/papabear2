import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import routes from './routes';
import reducers from './reducers/index';
import ReactGA from 'react-ga';
import { resumeGame } from './actions/auth'
import { AUTH_USER, UPDATE_GAME } from './actions/types';

import socket from './actions/socket'

// Import stylesheets
import './public/stylesheets/base.scss';
import './components/Game/components/index.scss';

// Initialize Google Analytics
ReactGA.initialize('UA-000000-01');

function logPageView() {
  ReactGA.pageview(window.location.pathname);
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');
const user = cookie.load('user');
if (token && user) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
  store.dispatch(resumeGame())
  socket.emit('authenticate', token) 
    .on('authenticated', function () {
      console.log('socket authorized, joining game')
      socket.emit('join game')
      socket.on('update game', (playerState, metaState) => {
        store.dispatch({ type: UPDATE_GAME, playerState, metaState})
      })
    })
    .on('unauthorized', function() {
      console.error('token not authorized via socket')
    })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.querySelector('.wrapper'));
