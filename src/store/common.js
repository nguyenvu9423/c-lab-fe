const LoadingState = {
  LOAD_NEEDED: 'LOAD_NEEDED',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  WITHOUT: 'WITHOUT',
  ERROR: 'ERROR',
  isDone: loadingState => {    
    switch (loadingState) {
      case LoadingState.LOADED:
      case LoadingState.ERROR:
      case LoadingState.WITHOUT:
        return true;
      default:
        return false;
    }
  },
  isInProgress: loadingState => {
    return !LoadingState.isDone(loadingState);
  }
};

export { LoadingState };
