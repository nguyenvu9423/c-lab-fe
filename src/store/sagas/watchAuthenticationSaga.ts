import { SagaIterator } from 'redux-saga';
import {
  take,
  fork,
  call,
  delay,
  put,
  race,
  cancel,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { login, logout, setToken, refreshToken, resetState } from '../actions';
import { AuthenticationService } from '../../services/auth/AuthenticationService';
import { AuthProvider } from '../../utils/authentication/tokenProvider';
import { Jwt } from '../../utils';
import { AuthenticationSelectors } from '../selectors';

export function* refreshTokenSaga(): SagaIterator {
  const currentToken: Jwt | undefined = yield select(
    AuthenticationSelectors.token(),
  );
  try {
    if (!currentToken) {
      throw new Error();
    }
    const response = yield call(
      AuthenticationService.refreshToken,
      currentToken.refresh_token,
    );

    const newToken = response.data;
    yield put(refreshToken.response({ token: newToken }));
  } catch (error) {
    yield put(refreshToken.failed({ error }));
  }
}

function* initToken(): SagaIterator {
  const storedToken = AuthProvider.getToken();
  let newToken: Jwt | null = null;
  if (storedToken) {
    try {
      const response = yield call(
        AuthenticationService.refreshToken,
        storedToken.refresh_token,
      );
      newToken = response.data;
    } catch (e) {
      console.log(e);
    }
  }
  yield put(setToken({ token: newToken }));
}

function* autoRefreshToken() {
  while (true) {
    const currentToken = yield select(AuthenticationSelectors.token());

    if (!currentToken) {
      throw new Error();
    }
    yield delay((currentToken.expires_in - 75) * 1000);
    yield call(refreshTokenSaga);
  }
}

export function* watchAuthFlowSaga(): SagaIterator {
  yield call(initToken);
  while (true) {
    const currentToken = yield select(AuthenticationSelectors.token());
    if (!currentToken) {
      const action = yield take(login);
      yield put(setToken({ token: action.payload.token as Jwt }));
    }

    const autoRefreshTask = yield fork(autoRefreshToken);

    yield race({
      logoutAction: take(logout),
      tokenExpired: take(refreshToken.failed),
    });
    yield cancel(autoRefreshTask);
    yield call(handleLogout);
  }
}

function* handleLogout(): SagaIterator<void> {
  yield put(resetState());
  yield put(setToken({ token: null }));
  yield call(AuthenticationService.logout);
}

export function* watchAuthenticationSaga() {
  yield takeEvery(refreshToken.request, refreshTokenSaga);
  yield fork(watchAuthFlowSaga);
}
