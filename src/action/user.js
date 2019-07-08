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
    response: res => {
      return res;
    }
  },
  updateUserEntity: undefined
});

const { setLoginUser, logUserOut } = createActions({
  setLoginUser: undefined,
  logUserOut: undefined
});

export {
  fetchLoginUser,
  setLoginUser,
  fetchUserById,
  fetchUserByUsername,
  updateUserEntity,
  logUserOut
};
