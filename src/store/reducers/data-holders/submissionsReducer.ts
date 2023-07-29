import { BaseException } from '../../../shared/exceptions/BaseException';
import { createReducer } from '@reduxjs/toolkit';
import { Pageable } from './../../../utils/Pageable';
import { LoadingState } from '../../common';
import { resetState, fetchSubmissions } from '../../actions';

export type SubmissionsState =
  | SubmissionsState.LoadNeeded
  | SubmissionsState.Loading
  | SubmissionsState.Loaded
  | SubmissionsState.Error;

export namespace SubmissionsState {
  export interface Base {
    loadingState: LoadingState;
    pageable?: Pageable;
    totalPages?: number;
  }

  export interface LoadNeeded extends Base {
    loadingState: LoadingState.LOAD_NEEDED;
  }

  export interface Loading extends Base {
    loadingState: LoadingState.LOADING;
    pageable: Pageable;
  }

  export interface Loaded extends Base {
    ids: number[];
    loadingState: LoadingState.LOADED;
    pageable: Pageable;
    totalPages: number;
  }

  export interface Error extends Base {
    loadingState: LoadingState.ERROR;
    pageable: Pageable;
    error: BaseException;
  }
}

const initialState: SubmissionsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const submissionsReducer = createReducer<SubmissionsState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchSubmissions.request, (state, action) => {
        const { payload } = action;
        return {
          pageable: payload.pageable,
          query: payload.query,
          loadingState: LoadingState.LOADING,
        };
      })
      .addCase(fetchSubmissions.response, (state, action) => {
        const { payload } = action;
        if (state.loadingState !== LoadingState.LOADING) {
          return state;
        }

        return {
          ...state,
          loadingState: LoadingState.LOADED,
          ids: payload.result,
          totalPages: payload.totalPages,
        };
      })
      .addCase(fetchSubmissions.error, (state, action) => {
        if (state.loadingState !== LoadingState.LOADING) {
          return state;
        }
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error: action.payload.error,
        };
      })
      .addCase(resetState, () => initialState);
  },
);
