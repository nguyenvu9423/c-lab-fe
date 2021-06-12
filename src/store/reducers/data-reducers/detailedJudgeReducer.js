import { LoadingState } from '../../common';
import { handleActions } from 'redux-actions';
import { fetchDetailedJudge } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined
};

const detailedJudgeReducer = handleActions(
  {
    [fetchDetailedJudge.request]: () => ({
      loadingState: LoadingState.LOADING
    }),
    [fetchDetailedJudge.response]: (state, { error, payload }) => {
      if (!error) {
        const { detailedJudge } = payload;
        return {
          id: detailedJudge.id,
          loadingState: LoadingState.LOADED
        };
      } else {
        const {
          data: { message }
        } = payload.response;
        return { loadingState: LoadingState.ERROR, error: { message } };
      }
    }
  },
  initialState
);

export { detailedJudgeReducer };
