import { createActions, handleActions } from 'redux-actions';

const registerActionCreators = createActions({
  registerUser: {
    request: user => user,
    response: token => token
  }
});

const registerReducers = handleActions(
  {
    registerUser: {
      request: (state, action) => {
        return { isFetching: true, fieldErrors: [], error: false };
      },
      response: {
        next() {},
        throw(state, action) {
          return {
            isFetching: false,
            fieldErrors: action.payload.fieldErrors,
            error: true
          };
        }
      }
    }
  },
  { isFetching: false, fieldErrors: [], error: false }
);

export { registerActionCreators, registerReducers };
