import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchJudgeConfigs } from '../../actions';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageable: {
    page: 0,
    size: 0
  },
  error: undefined,
  currentRequestId: undefined
};

export const judgeConfigsReducer = handleActions(
  {
    [fetchJudgeConfigs.request]: (state, { payload }) => {
      const { pageable } = payload;
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        pageable
      };
    },
    [fetchJudgeConfigs.response]: (state, action) => {
      if (!action.error) {
        const { judgeConfigs, totalPages } = action.payload;
        return {
          ...state,
          ids: judgeConfigs,
          loadingState: LoadingState.LOADED,
          totalPages,
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
