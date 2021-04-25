import { createActions } from 'redux-actions';

const { setToken, clearToken } = createActions({
  setToken: undefined,
  clearToken: undefined
});

export { setToken, clearToken };
