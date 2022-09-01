import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery } from 'redux-saga/effects';
import { setToken, fetchUser, SetTokenPayload } from '../actions';
import { Target } from '../reducers/target';
import { SagaIterator } from 'redux-saga';

function* fetchPrincipalSaga(action: PayloadAction<SetTokenPayload>) {
  const { token } = action.payload;
  if (token) {
    yield put(
      fetchUser.request({ type: 'principal', target: Target.PRINCIPAL })
    );
  }
}

export function* watchPrincipalSaga(): SagaIterator {
  yield takeEvery((action) => setToken.match(action), fetchPrincipalSaga);
}
