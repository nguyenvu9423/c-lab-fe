import { handleActions } from 'redux-actions';
import { fetchArticle } from '../action/article';

const articleReducer = handleActions(
  {
    [fetchArticle.request]: (state, action) => {
      return {
        articleId: action.payload.articleId,
        isFetching: true,
        error: undefined
      };
    },
    [fetchArticle.response]: (state, action) => {
      if (action.error) {
        const { response } = action.payload;
        return {
          ...state,
          isFetching: false,
          error: response.data
        };
      } else {
        return {
          ...state,
          isFetching: false
        };
      }
    }
  },
  {
    articleId: undefined,
    isFetching: false,
    error: undefined
  }
);

export { articleReducer };
