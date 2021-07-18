import { createReducer } from '@reduxjs/toolkit';
import { LoadingState } from '../../common';
import { setToken, fetchUser } from '../../actions';
import { Target } from '../target';

export interface PrincipalState {
  id?: number;
  loadingState: LoadingState;
  error?: any;
}

const initialState: PrincipalState = {
  id: undefined,
  loadingState: LoadingState.LOAD_NEEDED,
  error: undefined,
};

export const principalReducer = createReducer<PrincipalState>(
  initialState,
  (builder) => {
    builder
      .addCase(setToken, (state, action) => {
        const { token } = action.payload;
        if (token === null) {
          state.loadingState = LoadingState.WITHOUT;
        } else if (state.loadingState !== LoadingState.LOADED)
          state.loadingState = LoadingState.LOAD_NEEDED;
      })
      .addMatcher(
        (action) =>
          fetchUser.response.match(action) &&
          action.payload.target === Target.PRINCIPAL,
        (state, action) => {
          state.loadingState = LoadingState.LOADED;
          state.id = action.payload.result;
          state.error = undefined;
        }
      );
  }
);
