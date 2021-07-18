import { BaseException } from './../../../exception';
import { LoadingState } from './../../common';

export type DataHolderState<
  LoadingState extends Record<string, unknown> = Record<string, unknown>,
  LoadedState extends Record<string, unknown> = Record<string, unknown>,
  ErrorState extends Record<string, unknown> = Record<string, unknown>
> =
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
  }

  export interface Error extends Base {
    loadingState: LoadingState.ERROR;
    error: BaseException;
  }
}
