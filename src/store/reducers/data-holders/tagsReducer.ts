import { createReducer } from '@reduxjs/toolkit';
import { Tag } from './../../../domains/tag/Tag';
import { Pageable } from './../../../utils/Pageable';
import { NormalizedEntities } from './../../../entity-schemas/types';
import { fetchTags, resetState } from '../../actions';
import { LoadingState } from '../../common';
import { DataHolderState } from './shared';

export type TagsState = DataHolderState<
  { pageable: Pageable; query?: string },
  {
    result: number[];
    entities: NormalizedEntities<Tag>;
    pageable: Pageable;
    totalPages: number;
    query?: string;
  },
  { pageable: Pageable; query?: string }
>;

const initialState: TagsState = {
  loadingState: LoadingState.LOAD_NEEDED,
};

export const tagsReducer = createReducer<TagsState>(initialState, (builder) => {
  builder
    .addCase(fetchTags.request, (state, { payload }) => {
      const { pageable, query } = payload;
      return {
        loadingState: LoadingState.LOADING,
        pageable,
        query,
      };
    })
    .addCase(fetchTags.response, (state, { payload }) => {
      if (state.loadingState === LoadingState.LOADING) {
        const { result, entities, totalPages } = payload;
        return {
          ...state,
          loadingState: LoadingState.LOADED,
          result,
          entities,
          totalPages,
        };
      }
      return state;
    })
    .addCase(fetchTags.error, (state, { payload }) => {
      if (state.loadingState === LoadingState.LOADING) {
        return {
          ...state,
          loadingState: LoadingState.ERROR,
          error: payload.error,
        };
      }
      return state;
    })
    .addCase(resetState, () => initialState);
});
