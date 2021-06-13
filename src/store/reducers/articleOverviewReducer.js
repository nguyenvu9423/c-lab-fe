import { handleActions } from 'redux-actions';
import { fetchArticles } from '../actions/article';

const articleOverviewReducer = handleActions(
  {
    [fetchArticles.request]: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    [fetchArticles.response]: (state, action) => {
      if (!action.error) {
        const { articles, totalPages, number } = action.payload;
        return {
          articles,
          totalPages,
          number,
          isFetching: false,
          error: undefined,
        };
      }
    },
  },
  {
    articles: [],
    isFetching: false,
    error: undefined,
    totalPages: 0,
    number: 0,
  }
);

export { articleOverviewReducer };
