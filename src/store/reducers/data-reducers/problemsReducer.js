import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchProblems } from '../../actions/problem';
import { applyFilters, resetFilters } from '../../actions/filter';
import { resetState } from '../../actions/state';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageable: {
    page: 0,
    size: 0,
  },
  query: '',
  error: undefined,
  currentRequestId: undefined,
};

export const problemsReducer = handleActions(
  {
    [fetchProblems.request]: (state, { payload, meta }) => {
      const { pageable, query } = payload;
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        pageable,
        query,
        currentRequestId: meta.requestId,
      };
    },
    [fetchProblems.response]: (state, action) => {
      if (!action.error) {
        const { problems, totalPages } = action.payload;
        return {
          ...state,
          ids: problems,
          loadingState: LoadingState.LOADED,
          totalPages,
          error: undefined,
        };
      } else {
        return {
          ...initialState,
          loadingState: LoadingState.ERROR,
          error: 'Error',
        };
      }
    },
    [applyFilters]: (state, action) => {
      const { filters } = action.payload;
      return {
        ...state,
        loadingState: LoadingState.LOAD_NEEDED,
        filters,
      };
    },
    [resetFilters]: (state) => {
      return {
        ...state,
        loadingState: LoadingState.LOAD_NEEDED,
        filters: [],
      };
    },
    [resetState]: () => {
      return initialState;
    },
  },
  initialState
);
