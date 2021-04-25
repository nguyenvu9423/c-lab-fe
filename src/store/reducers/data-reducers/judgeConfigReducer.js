import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchJudgeConfig } from '../../actions';

const initialState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
  currentRequestId: undefined
};

export const judgeConfigsReducer = handleActions(
  {
    [fetchJudgeConfig.request]: state => {
      return {
        ...state,
        loadingState: LoadingState.LOADING
      };
    },
    [fetchJudgeConfig.response]: (state, action) => {
      if (!action.error) {
        const { judgeConfig } = action.payload;
        return {
          ...state,
          id: judgeConfig,
          loadingState: LoadingState.LOADED,
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
