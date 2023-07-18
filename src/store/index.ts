import { Jwt } from './../utils/Token';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { rootReducer } from './reducers/rootReducer';
import { AuthProvider } from '../utils/authentication/tokenProvider';
import { configureStore } from '@reduxjs/toolkit';
import { DataHolder } from './reducers/data-holders/shared';
export { State } from './state';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  // @ts-ignore
  enhancers: [applyMiddleware(sagaMiddleware)],
});

sagaMiddleware.run(rootSaga);

let currentToken: Jwt | null | undefined = undefined;

const handleTokenChange = () => {
  const authenticationState = store.getState().authentication;
  const newToken = DataHolder.isLoaded(authenticationState)
    ? authenticationState.token
    : null;

  if (currentToken !== newToken) {
    AuthProvider.setToken(newToken ? newToken : null);
    currentToken = newToken;
  }
};

store.subscribe(handleTokenChange);

export { store };
