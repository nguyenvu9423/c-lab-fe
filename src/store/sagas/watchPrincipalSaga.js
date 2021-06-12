import { put, takeEvery } from 'redux-saga/effects';
import { setToken, fetchUser } from '../actions';
import { Target } from '../reducers/target';

function* fetchPrincipalSaga(action) {
  const { token } = action.payload;
  if (token) {
    yield put(
      fetchUser.request({ isPrincipal: true }, { target: Target.PRINCIPAL })
    );
  }
}

export function* watchPrincipalSaga() {
  yield takeEvery(
    action => setToken.match(action) && !action.payload.isRefreshing,
    fetchPrincipalSaga
  );
}
