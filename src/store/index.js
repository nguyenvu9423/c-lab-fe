import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { rootReducer } from './reducers/rootReducer';
import { AuthProvider } from '../authentication/tokenProvider';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

let currentToken = null;

const handleTokenChange = () => {
  const newToken = store.getState().authentication.token;
  if (currentToken != newToken) {
    AuthProvider.setToken(newToken);
    currentToken = newToken;
  }
};

store.subscribe(handleTokenChange);

export { store };
