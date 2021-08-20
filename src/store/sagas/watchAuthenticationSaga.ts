import { take, fork, call, delay, put, race } from 'redux-saga/effects';
import { login, logout, setToken, refreshToken, resetState } from '../actions';
import { AuthenticationService } from '../../service/AuthenticationService';
import { AuthProvider } from '../../authentication/tokenProvider';
import { SagaIterator } from 'redux-saga';

function* initToken() {
  const storedToken = AuthProvider.getToken();
  if (storedToken) {
    try {
      const { data: newToken } = yield call(
        AuthenticationService.refreshToken,
        storedToken.refresh_token
      );
      return newToken;
    } catch (e) {
      yield call(AuthProvider.clearToken);
    }
  }
  return null;
}

function* autoRefreshToken(initialToken) {
  let currentRefreshToken = initialToken.refresh_token;
  let currentExpireIn = initialToken.expires_in;

  while (true) {
    yield delay((currentExpireIn - 30) * 1000);
    try {
      const { data: newToken } = yield call(
        AuthenticationService.refreshToken,
        currentRefreshToken
      );
      yield put(setToken({ token: newToken, isRefreshing: true }));

      currentRefreshToken = newToken.refresh_token;
      currentExpireIn = newToken.expires_in;
    } catch (e) {
      yield put(refreshToken.failed());
      return;
    }
  }
}

export function* watchAuthenticationSaga(): SagaIterator {
  let currentToken = yield call(initToken);
  while (true) {
    if (currentToken === null) {
      yield put(setToken({ token: null }));
      const action = yield take(login);
      currentToken = action.payload.token;
    }

    yield put(setToken({ token: currentToken }));
    yield fork(autoRefreshToken, currentToken);

    const { logoutAction } = yield race({
      logoutAction: take(logout),
      tokenExpired: take(refreshToken.failed),
    });

    if (logoutAction) {
      yield call(handleLogout);
    }

    currentToken = null;
  }
}

function* handleLogout(): SagaIterator<void> {
  yield put(setToken({ token: null }));
  yield put(resetState());
}
