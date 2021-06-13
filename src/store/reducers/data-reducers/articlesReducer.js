import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchArticles } from '../../actions/article';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageable: {
    page: 0,
    size: 10,
  },
  filters: [],
  error: undefined,
  currentRequestId: undefined,
};

export const articlesReducer = handleActions(
  {
    [fetchArticles.request]: (
      state,
      { payload: { pageable, filters }, meta }
    ) => {
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        pageable,
        filters,
        currentRequestId: meta.requestId,
      };
    },
    [fetchArticles.response]: (state, { error, payload, meta }) => {
      if (!error) {
        if (meta.requestId === state.currentRequestId) {
          const { articles, totalPages } = payload;
          return {
            ...state,
            ids: articles,
            loadingState: LoadingState.LOADED,
            totalPages,
            error: undefined,
          };
        }
      } else {
        const {
          response: {
            data: { message },
          },
        } = payload;
        return {
          error: { message },
        };
      }
      return state;
    },
  },
  initialState
);
