import { handleActions } from 'redux-actions';
import { LoadingState } from '../../common';
import { fetchRoles } from '../../actions';

const initialState = {
  ids: [],
  loadingState: LoadingState.LOAD_NEEDED,
  totalPages: 0,
  pageable: {
    page: 0,
    size: 10,
  },
  error: undefined,
  request: undefined,
};

export const rolesReducer = handleActions(
  {
    [fetchRoles.request]: (state, { payload }) => {
      const { pageable } = payload;
      return {
        ...state,
        loadingState: LoadingState.LOADING,
        pageable,
      };
    },
    [fetchRoles.response]: (state, action) => {
      if (!action.error) {
        const { roles, totalPages } = action.payload;
        return {
          ...state,
          ids: roles,
          loadingState: LoadingState.LOADED,
          totalPages,
          error: undefined,
        };
      } else {
        return {
          loadingState: LoadingState.ERROR,
          error: 'Error',
        };
      }
    },
  },
  initialState
);
