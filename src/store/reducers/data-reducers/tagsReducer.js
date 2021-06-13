import { fetchTags } from '../../actions';
import { LoadingState } from '../../common';
import { handleActions } from 'redux-actions';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageable: {
    page: 0,
    size: 10,
  },
  query: undefined,
  error: undefined,
  currentRequestId: undefined,
};

export const tagsReducer = handleActions(
  {
    [fetchTags.request]: (state, { payload: { pageable, query }, meta }) => {
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        pageable,
        query,
        currentRequestId: meta.requestId,
      };
    },
    [fetchTags.response]: (state, { error, payload, meta }) => {
      if (!error) {
        if (meta.requestId === state.currentRequestId) {
          const { tags, totalPages } = payload;
          return {
            ...state,
            ids: tags,
            loadingState: LoadingState.LOADED,
            totalPages,
            error: undefined,
          };
        }
      } else {
        const { message } = payload;
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error: { message },
        };
      }
      return state;
    },
  },
  initialState
);
