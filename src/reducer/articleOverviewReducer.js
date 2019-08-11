import { handleActions } from 'redux-actions';
import { fetchArticleList } from '../action/article';

const articleOverviewReducer = handleActions(
  {
    [fetchArticleList.request]: (state, action) => {
      return {
        ...state,
        isFetching: true
      };
    },
    [fetchArticleList.response]: (state, action) => {
      if (!action.error) {
        const {
          payload: { articleList }
        } = action;
        return {
          articleList,
          isFetching: false,
          error: undefined
        };
      }
    }
  },
  {
    articleList: [],
    isFetching: false,
    error: undefined
  }
);

export { articleOverviewReducer };
