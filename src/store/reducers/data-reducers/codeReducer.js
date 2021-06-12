import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchDetailedSubmission } from '../../actions';

const initialState = {
  loadingState: LoadingState.LOAD_NEEDED
};

export const codeReducer = handleActions(
  {
    [fetchDetailedSubmission.request]: () => ({
      loadingState: LoadingState.LOADING
    }),
    [fetchDetailedSubmission.response]: (state, action) => {
      const { error, payload } = action;
      if (!error) {
        const {
          detailedSubmission: { code }
        } = payload;
        return {
          code,
          loadingState: LoadingState.LOADED
        };
      } else {
        const { data } = payload.response;
        return {
          loadingState: LoadingState.ERROR,
          error: data
        };
      }
    }
  },
  initialState
);
