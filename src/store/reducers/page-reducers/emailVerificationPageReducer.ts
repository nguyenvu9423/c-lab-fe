import { createReducer, EntityId } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { LoadingState } from '../../common';
import { DataHolderState } from '../data-holders/shared';
import { createFilteredReducer } from '../utils';
import { Target, TargetPredicates } from '../target';
import { resetState, verifyEmail } from '../../actions';

export type EmailVerificationState = DataHolderState<
  Record<string, unknown>,
  { user: { id: EntityId }; hasRefreshedToken?: boolean }
>;

const initialState: EmailVerificationState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const emailVerificationReducer = createReducer<EmailVerificationState>(
  initialState,
  (builder) =>
    builder
      .addCase(verifyEmail.request, () => ({
        loadingState: LoadingState.LOADING,
      }))
      .addCase(verifyEmail.response, (state, action) => {
        if (state.loadingState === LoadingState.LOADING) {
          const { user, hasRefreshedToken } = action.payload;
          return {
            ...state,
            loadingState: LoadingState.LOADED,
            user,
            hasRefreshedToken,
          };
        }
        return state;
      })
      .addCase(verifyEmail.error, (state, action) => {
        if (state.loadingState === LoadingState.LOADING) {
          const { error } = action.payload;
          return { ...state, loadingState: LoadingState.ERROR, error };
        }
        return state;
      })
      .addCase(resetState, () => initialState)
);

export interface EmailVerificationPageState {
  data: {
    emailVerification: EmailVerificationState;
  };
}

export const emailVerificationPageReducer = createFilteredReducer(
  combineReducers<EmailVerificationPageState>({
    data: combineReducers({
      emailVerification: emailVerificationReducer,
    }),
  }),
  TargetPredicates.equal(Target.EMAIL_VERIFICATION_PAGE)
);
