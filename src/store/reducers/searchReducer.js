import { handleActions } from 'redux-actions';
import { search } from '../actions/search';
import { LoadingState } from '../common';

const initialState = {
  loadingState: LoadingState.LOADED,
  searchString: '',
  results: [],
};

const searchReducer = handleActions(
  {
    [search.request]: (state, { payload: { searchString } }) => {
      return {
        loadingState: LoadingState.LOADING,
        searchString,
        results: [],
      };
    },
    [search.response]: (state, { error, payload: { results } }) => {
      if (!error) {
        return {
          loadingState: LoadingState.LOADED,
          results,
        };
      } else {
        return {
          loadingState: LoadingState.ERROR,
          results: [],
        };
      }
    },
  },
  initialState
);

export { searchReducer };
