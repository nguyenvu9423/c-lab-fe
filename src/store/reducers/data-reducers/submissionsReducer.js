import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { resetState, fetchSubmissions } from '../../actions';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  pageable: { page: 0, size: 0 },
  error: undefined,
  totalPages: 0,
};

export const submissionsReducer = handleActions(
  {
    [fetchSubmissions.request]: (state, action) => {
      const { pageable, query } = action.payload;
      return { ...state, pageable, query, loadingState: LoadingState.LOADING };
    },
    [fetchSubmissions.response]: (state, action) => {
      if (!action.error) {
        const { submissions, totalPages } = action.payload;
        return {
          ...state,
          ids: submissions,
          loadingState: LoadingState.LOADED,
          totalPages,
          error: undefined,
        };
      } else {
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error: 'Error',
        };
      }
    },
    [resetState]: () => initialState,
  },
  initialState
);
