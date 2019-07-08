import { take, call, all, takeEvery, put } from 'redux-saga/effects';
import {
  fetchLoginUser,
  fetchUserById,
  fetchUserByUsername,
  setLoginUser,
  updateUserEntity
} from '../action/user';
import UserService from '../service/UserService';
import { userSchema } from '../entitySchema/userSchema';
import { normalize } from 'normalizr';
import { AuthProvider } from '../authentication/tokenProvider';

function* fetchLoginUserSaga() {
  if (AuthProvider.getToken()) {
    try {
      const response = yield call(UserService.getLoginUser);
      yield put(fetchLoginUser.response(response.data));
    } catch (e) {
      yield put(fetchLoginUser.response(e));
    }
  }
}

function* fetchLoginUserResponseSaga(action) {
  if (!action.error) {
    const { payload } = action;
    const updatedEntities = normalize(payload, userSchema).entities;
    yield put(updateUserEntity(updatedEntities.user));
    yield put(setLoginUser(payload));
  }
}

function* fetchUserByIdSaga(action) {
  const { userId } = action.payload;
  try {
    const response = yield call(UserService.getUserById, userId);
    yield put(fetchUserById.response(response.data));
  } catch (e) {
    yield put(fetchUserById.response(e));
  }
}

function* fetchUserByIdResponseSaga(action) {
  if (!action.error) {
    const user = action.payload;
    const entities = normalize(user, userSchema).entities;
    yield put(updateUserEntity(entities.user));
  }
}

function* fetchUserByUsernameSaga(action) {
  const { username } = action.payload;
  try {
    const response = yield call(UserService.getUserByUsername, username);
    yield put(fetchUserByUsername.response(response.data));
  } catch (e) {
    yield put(fetchUserByUsername.response(e));
  }
}

function* fetchUserByUsernameResponseSaga(action) {
  if (!action.error) {
    const user = action.payload;
    const entities = normalize(user, userSchema).entities;
    yield put(updateUserEntity(entities.user));
  }
}

function* watchUserSaga() {
  yield takeEvery(fetchLoginUser.request, fetchLoginUserSaga);
  yield takeEvery(fetchLoginUser.response, fetchLoginUserResponseSaga);
  yield takeEvery(fetchUserById.request, fetchUserByIdSaga);
  yield takeEvery(fetchUserById.response, fetchUserByIdResponseSaga);
  yield takeEvery(fetchUserByUsername.request, fetchUserByUsernameSaga);
  yield takeEvery(
    fetchUserByUsername.response,
    fetchUserByUsernameResponseSaga
  );
}

export { watchUserSaga };
