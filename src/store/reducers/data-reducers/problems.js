import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchProblems } from '../../actions/problem';
import { applyFilters, resetFilters } from '../../actions/filter';
import { resetState } from '../../actions/state';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageNumber: 0,
  filters: [],
  error: undefined
};

export const problemsReducer = handleActions(
  {
    [fetchProblems.request]: state => ({
      ...state,
      loadingState: LoadingState.LOADING
    }),
    [fetchProblems.response]: (state, action) => {
      if (!action.error) {
        const { problems, totalPages, pageNumber } = action.payload;
        return {
          ...state,
          ids: problems,
          loadingState: LoadingState.LOADED,
          totalPages,
          pageNumber,
          error: undefined
        };
      } else {
        return {
          ...initialState,
          loadingState: LoadingState.ERROR,
          error: 'Error'
        };
      }
    },
    [applyFilters]: (state, action) => {
      const { filters } = action.payload;
      return {
        ...state,
        loadingState: LoadingState.LOAD_NEEDED,
        filters
      };
    },
    [resetFilters]: state => {
      return {
        ...state,
        loadingState: LoadingState.LOAD_NEEDED,
        filters: []
      };
    },
    [resetState]: () => {
      return initialState;
    }
  },
  initialState
);
