import { call, takeEvery, put } from 'redux-saga/effects';
import {
  fetchUser,
  fetchLoginUser,
  setLoginUser,
  updateEntity,
  fetchUsers
} from '../actions';
import UserService from '../../service/UserService';
import { userSchema, usersSchema } from '../../entity-schemas/userSchema';
import { normalize } from 'normalizr';
import { AuthProvider } from '../../authentication/tokenProvider';

function* fetchUsersSaga(action) {
  const { payload, meta } = action;
  try {
    const { pageable } = payload;
    const { data } = yield call(UserService.getUsers, pageable);
    const { result, entities } = normalize(data.content, usersSchema);
    yield put(updateEntity(entities));
    yield put(
      fetchUsers.response(
        {
          users: result,
          totalPages: data.totalPages
        },
        meta
      )
    );
  } catch (e) {
    yield put(fetchUsers.response(e, meta));
  }
}

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
    const entities = normalize(payload, userSchema).entities;
    yield put(updateEntity(entities));
    yield put(setLoginUser(payload));
  }
}

function* fetchUserSaga(action) {
  const { payload, meta } = action;
  try {
    const { id, username } = payload;
    let response;
    if (id) {
      response = yield call(UserService.getUserById, id);
    } else if (username) {
      response = yield call(UserService.getUserByUsername, username);
    }
    const { result, entities } = normalize(response.data, userSchema);
    yield put(updateEntity(entities));
    yield put(fetchUser.response({ user: result }, meta));
  } catch (e) {
    yield put(fetchUser.response(e, meta));
  }
}

function* watchUserSaga() {
  yield takeEvery(fetchUsers.request, fetchUsersSaga);
  yield takeEvery(fetchLoginUser.request, fetchLoginUserSaga);
  yield takeEvery(fetchLoginUser.response, fetchLoginUserResponseSaga);
  yield takeEvery(fetchUser.request, fetchUserSaga);
}

export { watchUserSaga };
