import { createAction, createActions } from 'redux-actions';

const {
  fetchUserById,
  fetchLoginUser,
  updateUserEntity,
  fetchUserByUsername
} = createActions({
  fetchUserById: {
    request: userId => {
      return {
        userId
      };
    },
    response: user => user
  },
  fetchUserByUsername: {
    request: username => {
      return { username };
    },
    response: undefined
  },
  fetchLoginUser: {
    request: payload => payload,
    response: user => user
  },
  updateUserEntity: undefined
});

const setLoginUser = createAction('setLoginUser');

export {
  fetchLoginUser,
  setLoginUser,
  fetchUserById,
  fetchUserByUsername,
  updateUserEntity
};
