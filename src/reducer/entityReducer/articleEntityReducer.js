import { handleActions } from 'redux-actions';
import { updateArticleEntity } from '../../action/article';

const articleEntityReducer = handleActions(
  {
    [updateArticleEntity]: (state, action) => {
      const article = action.payload;
      return {
        ...state,
        ...article
      };
    }
  },
  {}
);

export { articleEntityReducer };
