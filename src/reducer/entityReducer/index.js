import { handleAction } from 'redux-actions';
import { updateEntity } from '../../action/entity';

const entityReducer = handleAction(
  updateEntity,
  (state, action) => {
    const { payload } = action;
    return {
      user: { ...state.user, ...payload.user },
      article: { ...state.article, ...payload.article }
    };
  },
  { user: {}, article: {} }
);
export { entityReducer };
