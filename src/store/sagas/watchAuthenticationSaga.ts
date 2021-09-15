import { take, fork, call, delay, put, race, cancel } from 'redux-saga/effects';
import { login, logout, setToken, refreshToken, resetState } from '../actions';
import { AuthenticationService } from '../../service/AuthenticationService';
import { AuthProvider } from '../../authentication/tokenProvider';
import { SagaIterator } from 'redux-saga';
import { Jwt, RefreshTokenPayload } from '../../utility';
import jwtDecode from 'jwt-decode';

function* initToken(): SagaIterator<Jwt | null> {
  const storedToken = AuthProvider.getToken();
  if (storedToken) {
    try {
      const { data: newToken } = yield call(
        AuthenticationService.refreshToken,
        storedToken.refresh_token
      );
      return newToken;
    } catch (e) {
      console.log(e);
    }
  }
  yield put(setToken({ token: null }));
  return null;
}

function* autoRefreshToken(initialToken: Jwt) {
  let accessTokenExpireIn = initialToken.expires_in;
  let currentRefreshToken = initialToken.refresh_token;
  const refreshTokenExpiredAt =
    jwtDecode<RefreshTokenPayload>(currentRefreshToken).exp;

  while (true) {
    try {
      yield delay((accessTokenExpireIn - 75) * 1000);
      if (Date.now() > refreshTokenExpiredAt * 1000) {
        yield put(refreshToken.failed());
        return;
      }

      const { data: newToken } = yield call(
        AuthenticationService.refreshToken,
        currentRefreshToken
      );
      yield put(setToken({ token: newToken, isRefreshing: true }));

      currentRefreshToken = newToken.refresh_token;
      accessTokenExpireIn = newToken.expires_in;
    } catch (e) {
      yield put(refreshToken.failed());
      return;
    }
  }
}

export function* watchAuthenticationSaga(): SagaIterator {
  let currentToken: Jwt | null = yield call(initToken);
  while (true) {
    if (currentToken === null) {
      const action = yield take(login);
      currentToken = action.payload.token as Jwt;
    }

    yield put(setToken({ token: currentToken }));
    const autoRefreshTask = yield fork(autoRefreshToken, currentToken);

    const { logoutAction } = yield race({
      logoutAction: take(logout),
      tokenExpired: take(refreshToken.failed),
    });

    if (logoutAction) {
      yield cancel(autoRefreshTask);
    }

    yield call(handleLogout);
    currentToken = null;
  }
}

function* handleLogout(): SagaIterator<void> {
  yield put(resetState());
  yield put(setToken({ token: null }));
}
