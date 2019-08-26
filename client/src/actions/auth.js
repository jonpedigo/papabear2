import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { postData, API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST, EVENT_SUCCESS, GAME_ERROR, SET_FAMILY, SET_KINGDOM, SET_GAME, SET_PLAYER, EVENT_RESULT } from './types';
import socket from './socket'
import { id } from '../design/game'
let gameId = id


//= ===============================
// Authentication actions
//= ===============================

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
  return function (dispatch) {
    return axios.post(`${API_URL}/auth/login`, { email, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER, payload: response.data });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function registerUser({ email, firstName, lastName, password }) {
  return function (dispatch) {
    return axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then((response) => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER, payload: response.data });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function login(props){
  debugger;
  return (dispatch, getState) => {
    return dispatch(loginUser(props)).then(() => {
      return dispatch(resumeGame(props)).then(() => {
        window.location.href = `${CLIENT_ROOT_URL}/game`;
      })
    })
  }
}

export function resumeGame(props){
  return (dispatch, getState) => {
    let gameId = cookie.load('user').game;
    return dispatch(selectGame(props)).then(() => {
      let characterId = cookie.load('user').currentCharacter;
      return dispatch(selectCharacter({characterId}))
    })
  }
}

export function register(props){
  return (dispatch, getState) => {
    return dispatch(registerUser(props)).then(() => {
      return dispatch(selectGame(props)).then(() => {
        return dispatch(registerFamily({lastName: props.characterLastName})).then(() => {
          let primary = true
          let familyId = cookie.load('user').family;
          return dispatch(registerCharacter({familyId, primary, firstName: props.characterFirstName})).then(() => {
            let characterId = cookie.load('user').currentCharacter;
            return dispatch(selectCharacter({characterId})).then(() => {
              window.location.href = `${CLIENT_ROOT_URL}/game`;
              return dispatch
            })
          })
        })
      })
    })
  }
}

export function selectCharacter({ characterId }) {
  const data = {characterId}
  const url = `/character/${characterId}/select`
  return (dispatch) => {
    return postData(SET_PLAYER, GAME_ERROR, true, url, dispatch, data)
  };
}

export function registerCharacter({primary, firstName, familyId}) {
  const data = {name: firstName, family: familyId}
  const url = `/character`
  return (dispatch) => {
    return postData(SET_PLAYER, GAME_ERROR, true, url, dispatch, data);
  };
}

export function registerFamily({lastName}) {
  const data = {name:lastName}
  const url = `/family`
  return (dispatch) => {
    return postData(SET_FAMILY, GAME_ERROR, true, url, dispatch, data);
  };
}

export function selectGame() {
  const data = {}
  const url = `/game/${gameId}/select`
  return (dispatch) => {
    return postData(SET_GAME, GAME_ERROR, true, url, dispatch, data)
  };
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });
    window.location.href = `${CLIENT_ROOT_URL}/login`;
  };
}

export function getForgotPasswordToken({ email }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/forgot-password`, { email })
    .then((response) => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: response.data.message,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function resetPassword(token, { password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
    .then((response) => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: response.data.message,
      });
      // Redirect to login page on successful password reset
      browserHistory.push('/login');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function protectedTest() {
  return function (dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { Authorization: cookie.load('token') },
    })
    .then((response) => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}
