import { createActions } from 'redux-actions';
import { defaultCreators, defaultPayloadCreators } from './shared';
import * as uuid from 'uuid';

const {
  fetchUsers,
  fetchUser,
  fetchUserById,
  fetchLoginUser,
  fetchUserByUsername,
  clearUser
} = createActions({
  fetchUsers: {
    request: [
      defaultPayloadCreators,
      (payload, meta) => ({ ...meta, requestId: uuid.v4() })
    ],
    response: defaultCreators
  },
  fetchUser: {
    request: defaultCreators,
    response: defaultCreators
  },
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
    request: () => ({}),
    response: defaultCreators
  },
  updateUserEntity: undefined,
  clearUser: defaultCreators
});

const { setLoginUser, logUserOut } = createActions({
  setLoginUser: undefined,
  logUserOut: undefined
});

export {
  fetchUsers,
  fetchUser,
  fetchLoginUser,
  setLoginUser,
  fetchUserById,
  fetchUserByUsername,
  logUserOut,
  clearUser
};
