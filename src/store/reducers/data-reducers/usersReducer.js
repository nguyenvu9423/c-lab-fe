import { LoadingState } from '../../common';
import { handleActions } from 'redux-actions';
import { fetchUsers } from '../../actions';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageable: {
    page: 0,
    size: 10
  },
  filters: [],
  error: undefined,
  currentRequestId: undefined
};

export const usersReducer = handleActions(
  {
    [fetchUsers.request]: (state, { payload, meta }) => {
      const { pageable, filters } = payload;
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        pageable,
        filters,
        error: undefined,
        currentRequestId: meta.requestId
      };
    },
    [fetchUsers.response]: (state, { payload, meta, error }) => {
      if (!error) {
        if (state.currentRequestId === meta.requestId) {
          const { users, totalPages } = payload;
          return {
            ...state,
            ids: users,
            loadingState: LoadingState.LOADED,
            totalPages,
            error: undefined
          };
        }
      } else {
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error: { message: payload.message }
        };
      }
      return state;
    }
  },
  initialState
);
