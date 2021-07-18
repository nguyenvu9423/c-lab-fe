import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { fetchUser } from '../../actions';
import { DataHolderState } from './shared';

export type UserState = DataHolderState<
  Record<string, unknown>,
  { result: number }
>;

const initialState: UserState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const userReducer = createReducer<UserState>(initialState, (builder) => {
  builder
    .addCase(fetchUser.request, () => ({
      loadingState: LoadingState.LOADING,
    }))
    .addCase(fetchUser.response, (state, action) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { result } = action.payload;
        return {
          ...state,
          loadingState: LoadingState.LOADED,
          result,
        };
      }
    })
    .addCase(fetchUser.error, (state, action) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { error } = action.payload;
        return { ...state, loadingState: LoadingState.ERROR, error };
      }
      return state;
    });
});

// export const userReducerMap = {
//   [fetchUser.request]: () => {
//     return {
//       loadingState: LoadingState.LOADING,
//     };
//   },
//   [fetchUser.response]: (state, { error, payload }) => {
//     if (!error) {
//       const { user } = payload;
//       return {
//         id: user,
//         loadingState: LoadingState.LOADED,
//       };
//     } else {
//       const {
//         response: {
//           data: { message },
//         },
//       } = payload;
//       return {
//         loadingState: LoadingState.ERROR,
//         error: {
//           message,
//         },
//       };
//     }
//   },
//   [clearUser]: () => {
//     return { loadingState: LoadingState.LOAD_NEEDED };
//   },
// };

// export const userReducer = handleActions(userReducerMap, initialState);
