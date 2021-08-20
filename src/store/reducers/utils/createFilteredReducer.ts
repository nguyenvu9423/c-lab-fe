import { AnyAction, Reducer } from 'redux';

export function createFilteredReducer<T extends Reducer<unknown, AnyAction>>(
  reducer: T,
  predicate: (action: AnyAction) => boolean
): Reducer<ReturnType<T>, AnyAction> {
  return (state: any, action: AnyAction) => {
    if (state === undefined || predicate(action)) {
      return reducer(state, action);
    }
    return state;
  };
}
