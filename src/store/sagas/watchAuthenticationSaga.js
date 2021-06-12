import { take, fork, call, delay, put, race } from 'redux-saga/effects';
import { login, logout, setToken, refreshToken } from '../actions';
import { AuthenticationService } from '../../service/AuthenticationService';
import { AuthProvider } from '../../authentication/tokenProvider';

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
    yield delay((currentExpireIn - 20) * 1000);
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

export function* watchAuthenticationSaga() {
  let currentToken = yield call(initToken);
  while (true) {
    if (currentToken === null) {
      yield put(setToken({ token: null }));
      const action = yield take(login);
      currentToken = action.payload;
    }

    yield put(setToken({ token: currentToken }));
    yield fork(autoRefreshToken, currentToken);

    yield race({
      logout: take(logout),
      tokenExpired: take(refreshToken.failed)
    });
    yield put(setToken({ token: null }));
    currentToken = null;
  }
}
