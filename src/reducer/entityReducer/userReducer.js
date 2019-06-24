import { handleActions } from 'redux-actions';
import { updateUserEntity } from '../../action/user';

const userEntityReducer = handleActions(
  {
    [updateUserEntity]: (state, action) => {
      const user = action.payload;
      return {
        ...state,
        ...user
      };
    }
  },
  {}
);

export { userEntityReducer };
