import { fetchLoginUser, logUserOut, setLoginUser } from '../action/user';
import { handleActions } from 'redux-actions';

const loginReducer = handleActions(
  {
    [fetchLoginUser]: {
      request: (state, action) => {},
      response: (state, action) => {}
    },
    [setLoginUser]: (state, action) => {
      const user = action.payload;
      return {
        isLogin: true,
        loginUser: user.id
      };
    },
    [logUserOut]: () => {
      return {
        isLogin: false,
        loginUser: null
      };
    }
  },
  {
    isLogin: false,
    loginUser: null
  }
);

export { loginReducer };
