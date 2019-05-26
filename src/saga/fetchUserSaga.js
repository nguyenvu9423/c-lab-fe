import { take, call, all, takeEvery, put } from 'redux-saga/effects';
import { fetchLoginUser, setLoginUser } from '../action/user';
import UserService from '../service/UserService';

function* fetchLoginUserSaga() {
  try {
    const response = yield call(UserService.getLoginUser);
    yield put(fetchLoginUser.response(response.data));
  } catch (e) {
    yield put(fetchLoginUser.response(e));
  }
}

function* fetchLoginUserResponseSaga(action) {
  if (!action.error) {
    yield put(setLoginUser(action.payload));
  }
}

function* watchUpdateUserSaga() {
  yield takeEvery(fetchLoginUser.request, fetchLoginUserSaga);
  yield takeEvery(fetchLoginUser.response, fetchLoginUserResponseSaga);
}

export { watchUpdateUserSaga };
