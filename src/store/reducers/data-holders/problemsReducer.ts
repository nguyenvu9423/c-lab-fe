import { createReducer } from '@reduxjs/toolkit';
import { Pageable } from './../../../utility/Pageable';
import { LoadingState } from '../../common';
import { fetchProblems } from '../../actions/problem';
import { DataHolderState } from './shared';

export type ProblemsState = DataHolderState<
  {
    pageable: Pageable;
    query?: string;
  },
  {
    result: number[];
    query?: string;
    pageable: Pageable;
    totalPages: number;
  },
  {
    query?: string;
    pageable: Pageable;
  }
>;

const initialState: ProblemsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const problemsReducer = createReducer<ProblemsState>(
  initialState,
  (builder) => {
    builder
      .addCase(fetchProblems.request, (state, action) => {
        const { pageable, query, requestId } = action.payload;
        return {
          loadingState: LoadingState.LOADING,
          pageable,
          query,
          requestId,
        };
      })
      .addCase(fetchProblems.response, (state, action) => {
        const { result, totalPages } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            result,
            loadingState: LoadingState.LOADED,
            totalPages,
          };
        }
        return state;
      })
      .addCase(fetchProblems.error, (state, action) => {
        const { error } = action.payload;
        if (state.loadingState === LoadingState.LOADING) {
          return {
            ...state,
            loadingState: LoadingState.ERROR,
            error,
          };
        }
        return state;
      });
  }
);
