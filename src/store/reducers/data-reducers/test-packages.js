import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import {
  fetchTestPackagesByOwningProblem,
  fetchTestPackages
} from '../../actions';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
  totalPages: 0,
  pageNumber: 0
};

export const testPackagesReducer = handleActions(
  {
    [fetchTestPackagesByOwningProblem.request]: (state, action) => {
      return {
        ...initialState,
        loadingState: LoadingState.LOADING
      };
    },
    [fetchTestPackages.response]: (state, action) => {
      if (!action.error) {
        const { testPackages, totalPages, pageNumber } = action.payload;
        return {
          ids: testPackages,
          loadingState: LoadingState.LOADED,
          totalPages,
          pageNumber,
          error: undefined
        };
      } else {
        return {
          ...initialState,
          loadingState: LoadingState.ERROR
        };
      }
    }
  },
  initialState
);
