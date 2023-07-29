import * as React from 'react';
import { Pageable } from '../../../utils';
import { BaseException } from '../../../shared/exceptions';
import { LoadingState } from './../../common';

export type DataHolderState<
  LoadingState extends Record<string, any> = Record<string, any>,
  LoadedState extends Record<string, any> = Record<string, any>,
  ErrorState extends Record<string, any> = Record<string, any>,
> =
  | DataHolderState.Without
  | DataHolderState.LoadNeeded
  | (DataHolderState.Loading & LoadingState)
  | (DataHolderState.Loaded & LoadedState)
  | (DataHolderState.Error & ErrorState);

export namespace DataHolderState {
  export interface Base {
    loadingState: LoadingState;
    requestId?: string;
  }

  export interface Loading extends Base {
    loadingState: LoadingState.LOADING;
  }

  export interface LoadNeeded extends Base {
    loadingState: LoadingState.LOAD_NEEDED;
  }

  export interface Loaded extends Base {
    loadingState: LoadingState.LOADED;
  }

  export interface Error extends Base {
    loadingState: LoadingState.ERROR;
    error: BaseException;
  }

  export interface Without extends Base {
    loadingState: LoadingState.WITHOUT;
  }

  export function isLoadRequested(
    state: DataHolderState,
  ): state is
    | DataHolderState.Loading
    | DataHolderState.Loaded
    | DataHolderState.Error {
    return (
      state.loadingState === LoadingState.LOADING ||
      state.loadingState === LoadingState.LOADED ||
      state.loadingState === LoadingState.ERROR
    );
  }

  export function isLoading(
    state: DataHolderState,
  ): state is DataHolderState.Loading {
    return state.loadingState === LoadingState.LOADING;
  }

  export function isError(
    state: DataHolderState,
  ): state is DataHolderState.Error {
    return state.loadingState === LoadingState.ERROR;
  }

  export function isLoaded(
    state: DataHolderState,
  ): state is DataHolderState.Loaded {
    return state.loadingState === LoadingState.LOADED;
  }
}

export namespace DataHolder {
  export function isLoadRequested(
    state: DataHolderState,
  ): state is
    | DataHolderState.Loading
    | DataHolderState.Loaded
    | DataHolderState.Error {
    return (
      state.loadingState === LoadingState.LOADING ||
      state.loadingState === LoadingState.LOADED ||
      state.loadingState === LoadingState.ERROR
    );
  }

  export function isLoading(
    state: DataHolderState,
  ): state is DataHolderState.Loading {
    return state.loadingState === LoadingState.LOADING;
  }

  export function isError(
    state: DataHolderState,
  ): state is DataHolderState.Error {
    return state.loadingState === LoadingState.ERROR;
  }

  export function isLoaded(
    state: DataHolderState,
  ): state is DataHolderState.Loaded {
    return state.loadingState === LoadingState.LOADED;
  }

  export function useTotalPages(
    state: DataHolderState<Record<string, any>, { totalPages: number }>,
  ): number | undefined {
    if (DataHolderState.isLoaded(state)) {
      return state.totalPages;
    }
    return undefined;
  }

  export function usePageable(
    state: DataHolderState<
      { pageable: Pageable },
      { pageable: Pageable },
      { pageable: Pageable }
    >,
    initialPageable: Pageable,
  ): Pageable {
    return DataHolderState.isLoadRequested(state)
      ? state.pageable
      : initialPageable;
  }

  export function useQuery(
    state: DataHolderState<
      { query?: string },
      { query?: string },
      { query?: string }
    >,
  ): string | undefined {
    return DataHolderState.isLoadRequested(state) ? state.query : undefined;
  }

  export function useReloadHelper(
    state: DataHolderState<
      { pageable: Pageable },
      { pageable: Pageable; totalPages: number },
      { pageable: Pageable }
    >,
    onReload?: (params: { pageable: Pageable }) => void,
  ): void {
    React.useEffect(() => {
      if (DataHolderState.isLoaded(state)) {
        const { totalPages, pageable } = state;
        if (totalPages && totalPages > 0 && pageable.page > totalPages - 1) {
          onReload?.({
            pageable: { page: totalPages - 1, size: pageable.size },
          });
        }
      }
    }, [state]);
  }
}
