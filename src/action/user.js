import { createAction, createActions } from 'redux-actions';

const { fetchLoginUser } = createActions({
  fetchLoginUser: {
    request: payload => payload,
    response: user => user
  }
});

const setLoginUser = createAction('SET_LOGIN_USER');

export { fetchLoginUser, setLoginUser };
