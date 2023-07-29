import { DataHolderState } from './../data-holders/shared';
import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { setToken, fetchUser } from '../../actions';
import { Target } from '../target';

export type PrincipalState = DataHolderState<
  Record<string, unknown>,
  { id: number }
>;

const initialState: PrincipalState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const principalReducer = createReducer<PrincipalState>(
  initialState,
  (builder) => {
    builder
      .addCase(setToken, (state, action) => {
        const { token } = action.payload;
        if (token === null) {
          return {
            loadingState: LoadingState.WITHOUT,
          };
        } else if (state.loadingState !== LoadingState.LOADED) {
          return {
            loadingState: LoadingState.LOAD_NEEDED,
          };
        }
      })
      .addMatcher(
        (action) =>
          fetchUser.response.match(action) &&
          action.payload.target === Target.PRINCIPAL,
        (state, action) => {
          const { result } = action.payload;
          return {
            loadingState: LoadingState.LOADED,
            id: result,
          };
        },
      );
  },
);
