export namespace LoadingState {
  export const isDone = (loadingState: LoadingState): boolean => {
    switch (loadingState) {
      case LoadingState.LOADED:
      case LoadingState.ERROR:
      case LoadingState.WITHOUT:
        return true;
      default:
        return false;
    }
  };

  export const isInProgress = (loadingState: LoadingState): boolean => {
    return !isDone(loadingState);
  };

  const isLoaded = (loadingState) => {
    return loadingState === LoadingState.LOADED;
  };
}

export enum LoadingState {
  LOAD_NEEDED = 'LOAD_NEEDED',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  WITHOUT = 'WITHOUT',
  ERROR = 'ERROR',
}
