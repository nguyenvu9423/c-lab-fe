import { Jwt } from './../utility/Token';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { rootReducer } from './reducers/rootReducer';
import { AuthProvider } from '../authentication/tokenProvider';
import { configureStore } from '@reduxjs/toolkit';
export { State } from './state';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  // @ts-ignore
  enhancers: [applyMiddleware(sagaMiddleware)],
});

sagaMiddleware.run(rootSaga);

let currentToken: Jwt | null | undefined = null;

const handleTokenChange = () => {
  // @ts-ignore
  const newToken = store.getState().authentication.token;
  if (currentToken != newToken) {
    AuthProvider.setToken(newToken);
    currentToken = newToken;
  }
};

store.subscribe(handleTokenChange);

export { store };
