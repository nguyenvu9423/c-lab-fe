import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchUser, updateEntity, fetchUsers } from '../actions';
import { UserService } from '../../service/UserService';
import { userSchema, usersSchema } from '../../entity-schemas/userSchema';
import { normalize } from 'normalizr';

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
          totalPages: data.totalPages,
        },
        meta
      )
    );
  } catch (e) {
    yield put(fetchUsers.response(e, meta));
  }
}

function* fetchUserSaga(action) {
  const { payload, meta } = action;
  try {
    const { id, username, isPrincipal } = payload;
    let response;
    if (id) {
      response = yield call(UserService.getUserById, id);
    } else if (username) {
      response = yield call(UserService.getUserByUsername, username);
    } else if (isPrincipal) {
      response = yield call(UserService.getLoginUser);
    }
    const { result, entities } = normalize(response.data, userSchema);
    yield put(updateEntity(entities));
    yield put(fetchUser.response({ user: result }, meta));
  } catch (e) {
    yield put(fetchUser.response(e, meta));
  }
}

function* watchUserSaga() {
  yield takeEvery(fetchUser.request, fetchUserSaga);
  yield takeEvery(fetchUsers.request, fetchUsersSaga);
}

export { watchUserSaga };
