import { put } from 'redux-saga/effects';
import { fetchLoginUser } from '../action/user';

function* appStartedSaga() {
  if (localStorage.getItem('token')) {
    yield put(fetchLoginUser.request());
  }
}

export { appStartedSaga };
