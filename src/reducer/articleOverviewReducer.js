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
        const { articleList, totalPages, number } = action.payload;
        return {
          articleList,
          totalPages,
          number,
          isFetching: false,
          error: undefined
        };
      }
    }
  },
  {
    articleList: [],
    isFetching: false,
    error: undefined,
    totalPages: 0,
    number: 0
  }
);

export { articleOverviewReducer };
