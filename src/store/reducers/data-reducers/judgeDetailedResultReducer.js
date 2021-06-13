import { LoadingState } from '../../common';
import handleActions from 'redux-actions/lib/handleActions';
import { clearDetailedResult, fetchDetailedJudge } from '../../actions';

const initialState = {
  detailedResult: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
};

export const judgeDetailedResultReducer = handleActions(
  {
    [fetchDetailedJudge.request]: () => ({
      loadingState: LoadingState.LOADING,
    }),
    [fetchDetailedJudge.response]: (state, { error, payload }) => {
      if (!error) {
        const {
          detailedJudge: { detailedResult },
        } = payload;
        return {
          detailedResult,
          loadingState: LoadingState.LOADED,
        };
      } else {
        return {
          detailedResult: undefined,
          loadingState: LoadingState.ERROR,
        };
      }
    },
    [clearDetailedResult]: () => initialState,
  },
  initialState
);
