import { fetchArticle, resetState } from '../../actions';
import { LoadingState } from '../../common';
import { handleActions } from 'redux-actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

export const articleReducer = handleActions(
  {
    [fetchArticle.request]: () => ({ loadingState: LoadingState.LOADING }),
    [fetchArticle.response]: (state, { error, payload }) => {
      if (!error) {
        const { article } = payload;
        return {
          ...state,
          id: article.id,
          loadingState: LoadingState.LOADED,
        };
      } else {
        const {
          response: {
            data: { message },
          },
        } = payload;
        return {
          loadingState: LoadingState.ERROR,
          error: { message },
        };
      }
    },
    [resetState]: () => initialState,
  },
  initialState
);
