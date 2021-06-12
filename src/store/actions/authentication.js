import { createActions } from 'redux-actions';
import { createAction } from '@reduxjs/toolkit';
import { defaultCreators } from './shared';
import { Target } from '../reducers/target';

const authActionCreators = [
  payload => payload,
  () => ({ target: Target.AUTHENTICATION })
];

const {
  fetchPrincipal,
  login,
  logout,
  clearToken,
  refreshToken
} = createActions({
  login: authActionCreators,
  logout: authActionCreators,
  fetchPrincipal: defaultCreators,
  clearToken: authActionCreators,
  refreshToken: {
    failed: authActionCreators
  }
});

const setToken = createAction('setToken');

export { fetchPrincipal, login, logout, setToken, clearToken, refreshToken };
